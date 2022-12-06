import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './features/notification/notificationSlice'
import blogsReducer from './features/blogs/blogsSlice'
import usersReducer from './features/users/usersSlice'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
})

export default store
