'use client'

import Welcome from '~/app/sections/welcome'
import { PostsResponse } from '~/lib/payload-types'

import IntroLoader from '../loader/IntroLoader'

const BlogMain: React.FC<{ posts: PostsResponse }> = ({ posts }) => {
  return (
    <IntroLoader>
      <Welcome posts={posts} />
    </IntroLoader>
  )
}

export default BlogMain
