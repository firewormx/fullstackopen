import {createSlice} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

//action creator
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    createNew(state, action){
const content = action.payload
state.push(content)
    },
    handleVoteButton(state, action){
      const id = action.payload
      const itemNeedChange = state.find(a => a.id === id)
      const changedOne = {...itemNeedChange, votes: itemNeedChange.votes + 1}
      return state.map(anecdote=> anecdote.id !== id ? anecdote :  changedOne)
    },
    setAnecdotes(state, action){
    return action.payload
    },
    appendAnecdotes(state, action){
      return state.push(action.payload)
    }
 }
})

export default anecdoteSlice.reducer
export const {createNew, handleVoteButton, setAnecdotes, appendAnecdotes} = anecdoteSlice.actions