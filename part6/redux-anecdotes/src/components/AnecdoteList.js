import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { clearNotif, updateNotif } from '../reducers/notificationReducer'

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
  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(updateNotif(`Voted on: ${anecdote.content}`))
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      
      )}
    </div>
  )
}

export default AnecdoteList