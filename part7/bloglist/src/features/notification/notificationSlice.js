import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, type: null, timerId: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state = action.payload
      return state
    },
    clearNotification: (state) => {
      state = initialState
      return state
    },
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const createNotification = (notification) => {
  return (dispatch, getState) => {
    const existingTimer = getState().notification.timerId
    if (existingTimer) {
      clearTimeout(existingTimer)
    }

    const newTimerId = setTimeout(() => dispatch(clearNotification()), 5000)
    dispatch(showNotification({ ...notification, timerId: newTimerId }))
  }
}

export default notificationSlice.reducer
