import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import {
  clearNotification,
  createNotification,
} from '../notification/notificationSlice'

const initialState = {
  all: [],
  currentUser: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: function (state, action) {
      state.currentUser = action.payload
      return state
    },
    setUsers: function (state, action) {
      state.all = action.payload
      return state
    },
  },
})

export const { setCurrentUser, setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/users')
    dispatch(setUsers(data))
  }
}

export const loginUser = (userObject) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.post('/api/login', userObject)
      dispatch(setCurrentUser(user))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(clearNotification())
    } catch (error) {
      dispatch(
        createNotification({
          message: error.response.data.error,
          type: 'login',
        }),
      )
    }
  }
}

export const selectCurrentUser = (state) => state.users.currentUser

export default userSlice.reducer
