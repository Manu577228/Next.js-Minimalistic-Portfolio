import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout/Layout'
import { fetchInstagram, fetchWorks } from '../utils/api'
import { InstagramPost } from '../models/instagram'
import LandingPage from '../components/LandingPage/LandingPage'
import Canvas from '../components/Canvas/Canvas'
import Instagram from '../components/Instagram/Instagram'
import Contact from '../components/Contact/Contact'

type Props = {
  posts: InstagramPost[]
}

const IndexPage: React.FC<Props> = ({ posts }) => {
  return (
    <Layout title="Home">
      {process.env.NODE_ENV === 'production' && (
        <div className="canvas-wrapper">
          <Canvas />
        </div>
      )}
      <LandingPage />

      <Instagram posts={posts} />
      <Contact />
    </Layout>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps<Props> = async _ => {
  const works = await fetchWorks()
  const posts = await fetchInstagram()

  return {
    props: { works, posts },
  }
}
