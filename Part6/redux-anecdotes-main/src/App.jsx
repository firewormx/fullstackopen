import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

useEffect(()=> {
 dispatch(initializeAnecdotes())
 })

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