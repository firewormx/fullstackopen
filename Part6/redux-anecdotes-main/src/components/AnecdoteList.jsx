import { useSelector, useDispatch } from "react-redux";
import  {handleVoteButton} from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
    const dispatch = useDispatch()
    // const anecdotes = useSelector(state => state.anecdotes)
    const anecdotes = useSelector(({filter, anecdotes}) => {
     if (filter === '') {
      return anecdotes
     }else {
      return anecdotes.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
     }
})


    const copy = [...anecdotes]
    const sortedAnecdotes = copy.sort((a, b) => b.votes - a.votes)

    const vote = (anecdote) => {
dispatch(handleVoteButton(anecdote.id))
dispatch(showNotification(anecdote.content))
setTimeout(() => {
  dispatch(removeNotification(null))
}, 5000)
    }

return (
  <div>
       {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
       
      )}
</div>
)
}

export default Anecdotes