import { connect } from 'react-redux'
import { voteFor } from './anecdotesSlice'
import { setNotification } from '../notification/notificationSlice'

const AnecdoteList = ({ filter, anecdotes, voteFor, setNotification }) => {
  const filteredAnecdotes = filter
    ? anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter),
      )
    : anecdotes

  const sortedAnecdotes = filteredAnecdotes
    .slice()
    .sort((a, b) => b.votes - a.votes)
  const handleVote = (anecdote) => {
    voteFor(anecdote)
    setNotification(`you voted, '${anecdote.content}'`, 10)
  }

  return sortedAnecdotes.map((anecdote) => {
    const { id, content, votes } = anecdote
    return (
      <div key={id}>
        <div>{content}</div>
        <div>
          has {votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )
  })
}

const mapStateToProps = (state) => {
  return { filter: state.filter, anecdotes: state.anecdotes }
}

const mapStateToDispatch = {
  voteFor,
  setNotification,
}

export default connect(mapStateToProps, mapStateToDispatch)(AnecdoteList)
