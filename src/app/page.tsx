import BlogMain from '~/components/blog-main'
import { fetchBlogPosts } from '~/lib/api'
import { PostsResponse } from '~/lib/payload-types'

const HomePage: React.FC = async () => {
  const posts: PostsResponse = await fetchBlogPosts()

  return <BlogMain posts={posts} />
}

export default HomePage
