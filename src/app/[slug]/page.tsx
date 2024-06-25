import { fetchBlogPostBySlug, fetchBlogPosts } from '~/lib/api'

import BlogPost from '.'

interface Params {
  params: {
    slug: string
  }
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetchBlogPosts()

  return posts.docs.map((post: { slug: Params }) => ({
    slug: post.slug
  }))
}
const BlogPostPage = async ({ params }: Params) => {
  const { slug } = params
  const post = await fetchBlogPostBySlug(slug)
  return <BlogPost post={post} />
}

export default BlogPostPage
