import axios from 'axios'
import { InstagramResponse } from '../models/instagram'
import {
  readFileSync,
  existsSync,
  writeFileSync,
  createWriteStream,
  WriteStream,
} from 'fs'
import sanity from '../config/sanity'


export const fetchBioPage = async () => {
  try {
    const { content: bio } = await sanity.fetch(
      `*[ _type == "bio" ][0]{ content }`
    )
    return bio
  } catch {
    return { content: 'Failed to load bio page' }
  }
}

export const fetchInstagram = async (): Promise<any> => {
  const hasCached = existsSync('data/post_cache.json')

  if (hasCached) {
    return JSON.parse(readFileSync('data/post_cache.json').toString())
  }

  const fields = [
    'id',
    'media_url',
    'media_type',
    'username',
    'timestamp',
    'thumbnail_url',
    'permalink',
    'caption',
  ]

  const access_token = process.env.INSTAGRAM_ACCESS_TOKEN

  const posts = await axios
    .get<InstagramResponse>(
      `https://graph.instagram.com/me/media?fields=${fields.join(
        ','
      )}&access_token=${access_token}&limit=8`
    )
    .then(data => data.data.data)
    .catch(_ => console.log(`Did you forget to update your instagram token?`))

  console.log({ posts })

  if (!posts) return []

  const localPosts = await Promise.all(
    posts.map(async (post, i) => {
      const localUrl = `/assets/instagram_${i}.jpg`

      const stream = createWriteStream(`public/${localUrl}`)
      const { data } = await axios.get<WriteStream>(post.media_url, {
        responseType: 'stream',
      })

      return new Promise(resolve => {
        const pipe = data.pipe(stream)
        pipe.addListener('finish', () => {
          resolve({ ...post, local_url: localUrl })
        })
      })
    })
  )

  writeFileSync(
    'data/post_cache.json',
    JSON.stringify(localPosts, null, 2),
    'utf8'
  )

  return localPosts
}
