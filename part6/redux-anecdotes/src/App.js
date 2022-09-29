import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { intializeAnecdotes } from './features/anecdotes/anecdotesSlice'

import AnecdoteList from './features/anecdotes/AnecdoteList'
import AnecdoteForm from './features/anecdotes/AnecdoteForm'
import Notification from './features/notification/Notification'
import Filter from './features/filter/Filter'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(intializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
