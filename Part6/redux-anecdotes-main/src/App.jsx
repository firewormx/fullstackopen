import AnecdotesList from './AnecdoteList'
import AnecdoteForm from './AnecdoteForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList />
   <AnecdoteForm />
    </div>
  )
}

export default App