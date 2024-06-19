import blogPosts, { BlogPostProps } from '~/data/blog-posts'

import BlogPost from './index'

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())

  return blogPosts.map((post: BlogPostProps) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    content: post.content,
    date: post.date
  }))
}

export default function BlogPostPage({
  title,
  content,
  id,
  date,
  slug
}: BlogPostProps) {
  return (
    <BlogPost title={title} content={content} id={id} date={date} slug={slug} />
  )
}
