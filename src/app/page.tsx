import BlogMain from '~/components/blog-main'
import { fetchBlogPosts } from '~/lib/api'
import { Post } from '~/lib/payload-types'

const HomePage: React.FC = async () => {
  const posts: Post[] = await fetchBlogPosts()

  return <BlogMain posts={posts} />
}

export default HomePage
