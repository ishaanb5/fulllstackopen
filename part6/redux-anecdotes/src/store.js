import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './features/anecdotes/anecdotesSlice'
import notificationReducer from './features/notification/notificationSlice'
import filterReducer from './features/filter/filterSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
})

export default store
