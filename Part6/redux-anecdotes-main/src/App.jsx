import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

useEffect(()=> {
 anecdoteService.getAll()
 .then(anecdotes => {
 dispatch(setAnecdotes(anecdotes))
 })
},[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
    <br></br>
      <Filter />
      <AnecdotesList />
   <AnecdoteForm />
    </div>
  )
}

export default App