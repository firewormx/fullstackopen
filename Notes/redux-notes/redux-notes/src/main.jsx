import React from 'react'
import ReactDOM from 'react-dom/client'
// import {combineReducers } from 'redux'
import {Provider} from 'react-redux'
import  {configureStore} from '@reduxjs/toolkit'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

 console.log(store.getState())

// store.dispatch(filterChange('Important'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <App />
  </Provider>
)

