import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {getAll, createNew, updateOne} from './requests'
import {useQuery} from '@tanstack/react-query'

const App = () => {

const result = useQuery({
  queryKey: ['anecdotes'],
  queryFn: getAll,
  retry: false
})
console.log(JSON.parse(JSON.stringify(result)))

if(result.isLoading){
  return <div>loading data...</div>
}

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
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
