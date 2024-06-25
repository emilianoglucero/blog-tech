import axios from 'axios'

const API_URL = 'http://localhost:4000'

export const fetchBlogPosts = async () => {
  const response = await axios.get(`${API_URL}/api/posts`)
  return response.data
}

export const fetchBlogPost = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/posts/${id}`)
  return response.data
}

export const fetchBlogPostBySlug = async (slug: string) => {
  const response = await axios.get(`${API_URL}/api/posts/slug/${slug}`)
  return response.data
}
