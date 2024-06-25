'use client'

import { Welcome } from '~/app/sections/welcome'
import { useAppStore } from '~/context/use-app-store'
import { PostsResponse } from '~/lib/payload-types'

import { Loader } from '../loader'

const BlogMain: React.FC<{ posts: PostsResponse }> = ({ posts }) => {
  const { introSeen } = useAppStore()
  return introSeen ? <Welcome posts={posts} /> : <Loader />
}

export default BlogMain
