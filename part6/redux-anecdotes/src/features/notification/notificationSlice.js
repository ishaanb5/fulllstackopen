import { createSlice } from '@reduxjs/toolkit'

let notificationTimeoutId
const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    showNotification: (state, action) => {
      notificationTimeoutId && clearInterval(notificationTimeoutId)
      return action.payload
    },

    hideNotification() {
      return ''
    },
  },
})

const { hideNotification, showNotification } = notificationSlice.actions

export const setNotification = (notification, displayTime = 5) => {
  const displayTimeInMilliSeconds = displayTime * 1000
  return (dispatch) => {
    dispatch(showNotification(notification))
    notificationTimeoutId = setTimeout(() => {
      dispatch(hideNotification())
    }, displayTimeInMilliSeconds)
  }
}

export default notificationSlice.reducer
