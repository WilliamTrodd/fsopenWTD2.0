import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    const handleVote = async (anecdote) => {
      dispatch(addVote(anecdote))
      dispatch(setNotification(`Voted on: ${anecdote.content}`,5))
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