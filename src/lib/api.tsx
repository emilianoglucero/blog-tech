import axios from 'axios'

const API_URL = process.env.API_URL

export const fetchBlogPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/posts`)
    return response.data
  } catch (error) {
    console.error(`Error fetching blog posts:`, error)
    throw error // Re-throw the error if you want to handle it further up the call stack
  }
}

export const fetchBlogPost = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/posts/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching blog post with id ${id}:`, error)
    throw error // Re-throw the error if you want to handle it further up the call stack
  }
}

export const fetchBlogPostBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/posts/slug/${slug}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    throw error // Re-throw the error if you want to handle it further up the call stack
  }
}
