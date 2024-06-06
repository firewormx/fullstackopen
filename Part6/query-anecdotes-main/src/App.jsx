import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {getAll, createNew, updateOne} from './requests'
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

const updateAnecdoteMutation = useMutation({
  mutationFn: updateOne,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['anecdotes']})
  }
})

const handleVote = (anecdote) => {
  updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  dispatch({type:'vote', payload: anecdote.content}) // pass payload to reducer
  setTimeout(()=> {
dispatch({type: 'remove'})
  }, 5000)
}

const result = useQuery({
  queryKey: ['anecdotes'],
  queryFn: getAll,
  refetchOnWindowFocus: false// get request is not done when bar is clicked
})
console.log(JSON.parse(JSON.stringify(result)))

if(result.isLoading){
  return <div>loading data...</div>
}else if(result.isError){
  return <div>anecdote service not available due to problems in server</div>
}

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification anecdotes= {anecdotes}/>
      <AnecdoteForm />
    
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

export default App
