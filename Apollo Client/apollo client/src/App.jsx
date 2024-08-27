import {useQuery, useApolloClient, useSubscription} from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS, PERSON_ADDED } from './queries'
import { useState } from 'react'
import LoginForm from './components/LoginForm'


// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_PERSONS, {
    // pollInterval: 2000 // update the cache
  })
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

  // useSubscription returns an obj (contains loading, error, data etc peroperties)
  //from Apollo Client to render the new person added to Persons list
  useSubscription(PERSON_ADDED, {
    // state updates in an event handler onData might be batched and cause only a single rerender.
    onData : ({data, client}) => { 
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)

    updateCache(client.cache, {query: ALL_PERSONS}, addedPerson)
    }
  })

  if(result.loading){
    return <div>loading...</div>
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
