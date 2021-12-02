import React, { useState } from 'react'

const DailyAnecdote = (props) => {
  const { anecdotes, selected, vote } = props
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Before software can be reusable it first has to be usable.',
    'How does a project get to be a year late?... One day at a time. ',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(9).fill(0))

  const handleNextClick = () => {
    let randomNumber = Math.floor(Math.random() * 9)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    const copyVotes = [...vote]
    copyVotes[selected] += 1
    setVote(copyVotes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <DailyAnecdote selected={selected} vote={vote} anecdotes={anecdotes} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      {Math.max(...vote) === 0 ? (
        <p>
          Be the first to vote and make your favourite anecdote today's most
          voted for.
        </p>
      ) : (
        <DailyAnecdote
          selected={vote.indexOf(Math.max(...vote))}
          vote={vote}
          anecdotes={anecdotes}
        />
      )}
    </div>
  )
}
export default App
