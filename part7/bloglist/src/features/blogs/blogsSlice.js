import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createNotification } from 'features/notification/notificationSlice'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: function (state, action) {
      return action.payload
    },
    addBlog: function (state, action) {
      state.push(action.payload)
    },
    updateBlog: function (state, action) {
      const { id } = action.payload
      const updatedBlog = action.payload
      return state.map((blog) => {
        return blog.id !== id ? blog : updatedBlog
      })
    },
    removeBlog: function (state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { addBlog, setBlogs, updateBlog, removeBlog } = blogsSlice.actions

const baseUrl = '/api/blogs'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const { data } = await axios.get(baseUrl)
    dispatch(setBlogs(data))
  }
}

export const createNewBlog = (newBlog) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(baseUrl, newBlog, {
        headers: {
          Authorization: `bearer ${getState().users.currentUser.token}`,
        },
      })
      dispatch(addBlog(data))
      dispatch(
        createNotification({
          message: `A new blog ${newBlog.title} ${
            newBlog.author && `by ${newBlog.author}`
          }added`,
          type: 'success',
        }),
      )
    } catch (error) {
      dispatch(
        createNotification({
          message: error.response.data.error,
          type: 'error',
        }),
      )
    }
  }
}

export const updateBlogLikes = (id, updatedBlogObject) => {
  return async (dispatch) => {
    const { data: updatedBlog } = await axios.put(
      `${baseUrl}/${id}`,
      updatedBlogObject,
    )
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `bearer ${getState().users.currentUser.token}`,
      },
    })
    dispatch(removeBlog(id))
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const { data: updatedBlog } = await axios.post(
      `${baseUrl}/${id}/comments`,
      {
        comment,
      },
    )
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogsSlice.reducer
