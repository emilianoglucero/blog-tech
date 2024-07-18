'use client'

import Welcome from '~/app/sections/welcome'
// import Welcome from '~/app/sections/welcome'
import { useAppStore } from '~/context/use-app-store'
import { PostsResponse } from '~/lib/payload-types'

import Loader from '../loader'

// const Welcome = lazy(() =>
//   import('~/app/sections/welcome').then((module) => ({
//     default: module.default
//   }))
// )

// const Welcome = dynamic(() => import('~/app/sections/welcome'), {
//   suspense: true,
//   loading: () => null
// })

const BlogMain: React.FC<{ posts: PostsResponse }> = ({ posts }) => {
  const { introSeen } = useAppStore()
  // if (!introSeen) {
  //   return <Loader />
  // }
  // return <Welcome posts={posts} />

  // return <Loader />
  return introSeen ? <Welcome posts={posts} /> : <Loader />
  // return <Welcome posts={posts} />
}

export default BlogMain
