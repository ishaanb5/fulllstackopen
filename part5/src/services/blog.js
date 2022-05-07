import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (jwt) => {
  token = `bearer ${jwt}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: {
      Authorization: token,
    },
  })

  return response.data
}

const updateLike = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    likes: updatedBlog.likes,
  })

  return response.data
}

const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  })
}

const blogService = { getAll, setToken, createBlog, updateLike, deleteBlog }

export default blogService
