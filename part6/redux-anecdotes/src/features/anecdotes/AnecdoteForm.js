import { connect } from 'react-redux'
import { createNewAnecdote } from './anecdotesSlice'
import { setNotification } from '../notification/notificationSlice'

const AnecdoteForm = ({ createNewAnecdote, setNotification }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdoteContent.value
    createNewAnecdote(content)
    e.target.anecdoteContent.value = ''
    setNotification(`Added new anecdote: '${content}'`, 5)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>create new</h3>
      <input name="anecdoteContent" />
      <button>create</button>
    </form>
  )
}

const mapStateToDispatch = {
  createNewAnecdote,
  setNotification,
}

export default connect(null, mapStateToDispatch)(AnecdoteForm)
