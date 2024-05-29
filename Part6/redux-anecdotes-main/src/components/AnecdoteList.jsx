import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotifications } from "../reducers/notificationReducer";

const Anecdotes = () => {
    const dispatch = useDispatch()
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
dispatch(voteAnecdote(anecdote))
dispatch(setNotifications(`you voted '${anecdote.content}'`, 10))
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