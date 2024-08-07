import {useQuery, useApolloClient} from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS } from './queries'
import { useState } from 'react'
import LoginForm from './components/LoginForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_PERSONS, {
    // pollInterval: 2000 // update the cache
  })

  if(result.loading){
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
     setErrorMessage(null)
    }, 10000)
      }

  const logout = () => {
   setToken(null)
   localStorage.clear()
   client.resetStore()
  }

  if(!token){
    return (
      <>
      <Notify errorMessage={errorMessage} />
      <LoginForm  setToken = {setToken} setError = {notify} />
      </>
      )
  }
  
  return (<div>
    <Notify errorMessage = {errorMessage}/>
    <button onClick={logout}>logout</button>
     <Persons persons={result.data.allPersons}/>
     <PersonForm setError ={notify}/>
     <PhoneForm setError ={notify}/>
     </div>
  )
}


export default App
