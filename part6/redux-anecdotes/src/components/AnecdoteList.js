import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { clearNotif, updateNotif } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = (props) => {
  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state => (
    filter !== "" 
      ? state.anecdotes.filter(anecdote => (
          anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        )
      : state.anecdotes)
  
    )
  
    const dispatch = useDispatch()
  const handleVote = async (id) => {
    const changedAnecdote = await anecdoteService.vote(id)
    dispatch(vote(changedAnecdote))
    dispatch(updateNotif(`Voted on: ${changedAnecdote.content}`))
    setTimeout(() => {
      dispatch(clearNotif())
    },5000)
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      
      )}
    </div>
  )
}

export default AnecdoteList