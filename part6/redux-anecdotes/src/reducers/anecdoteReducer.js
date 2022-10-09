import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    createAnecdote(state, action) {
      state.push(action.payload)
    },
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



export const { createAnecdote, vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer