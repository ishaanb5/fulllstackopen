import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdotes: (state, action) => {
      return action.payload
    },
    newAnecdote: (state, action) => {
      state.push(action.payload)
    },
    updateAnecdote: (state, action) => {
      const { id, updatedAnecdote } = action.payload
      return state.map((anecdote) => {
        if (anecdote.id === id) {
          return updatedAnecdote
        } else {
          return anecdote
        }
      })
    },
  },
})

export const { newAnecdote, updateAnecdote, appendAnecdotes } =
  anecdoteSlice.actions

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(anecdote))
  }
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const { id, votes } = anecdote
    const updatedAnecdote = {
      ...anecdote,
      votes: votes + 1,
    }
    await anecdoteService.update(id, updatedAnecdote)
    dispatch(updateAnecdote({ id, updatedAnecdote }))
  }
}

export const intializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(appendAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
