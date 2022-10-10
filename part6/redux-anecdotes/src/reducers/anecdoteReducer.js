import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    vote(state, action) {
      const changedAnecdote = action.payload
      const id = changedAnecdote.id
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
        ).sort((a,b) => b.votes-a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
}
})



export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(vote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer