import React from 'react'
import ReactDOM from 'react-dom/client'
import noteService from '../services/notes'
import noteReducer, {setNotes} from './reducers/noteReducer'

import {Provider} from 'react-redux'
import  {configureStore} from '@reduxjs/toolkit'

import App from './App'
import filterReducer, { filterChange } from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

 console.log(store.getState())

//  noteService.getAll().then(notes => {
//  store.dispatch(setNotes(notes))
//  })

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <App />
  </Provider>
)

