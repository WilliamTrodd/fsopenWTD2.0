import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from "./reducers/filterReducer"
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  }
})

anecdoteService.getAll().then(anecdotes => 
  store.dispatch(setAnecdotes(anecdotes))
)

export default store