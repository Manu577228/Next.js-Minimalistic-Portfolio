import styles from './Instagram.module.scss'
import { InstagramPost } from '../../models/instagram'
import { ExternalLink } from 'react-feather'
import InstagramCaption from './Caption'
import { useEffect, useState } from 'react'

const Instagram: React.FC<{ posts: InstagramPost[] }> = ({ posts }) => {
  return (
    <div id={styles.Instagram}>
      <br />
      <h1>
          <span className="accent-bg">PROJECTS</span>
      </h1>

      <div className={styles.posts}>
        <div className={styles.left}>
          {posts
            .filter((_, i) => !(i % 2))
            .map(post => (
              <Post key={post.id} post={post} />
            ))}
        </div>

        <div className={styles.right}>
          {posts
            .filter((_, i) => i % 2)
            .map(post => (
              <Post key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  )
}

const Post: React.FC<{ post: InstagramPost }> = ({ post }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    setImageSrc(post.local_url || post.thumbnail_url || post.media_url)
  }, [post])

  return !imageSrc ? (
    <></>
  ) : (
    <div id={`ig-${post.id}`} key={post.id} className={styles.post}>
      <img src={imageSrc} alt={post.caption} />

      <div className={`${styles.caption} sans`}>
        <p>
          <InstagramCaption>{post.caption}</InstagramCaption>
          {/* 👆 Please don't tell my boss */}
          <a target="_blank" rel="noopener noreferrer" href={post.permalink}>
            <ExternalLink />
          </a>
        </p>
      </div>
    </div>
  )
}

export default Instagram
