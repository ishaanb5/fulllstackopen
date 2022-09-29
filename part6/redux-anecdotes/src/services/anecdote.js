import axios from 'axios'

const baseUrl = '/anecdotes'

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const createNew = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  }
  const { data } = await axios.post(baseUrl, newAnecdote)
  return data
}

const update = async (id, updatedAnecdote) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return data
}

const anecdoteService = {
  getAll,
  createNew,
  update,
}

export default anecdoteService
