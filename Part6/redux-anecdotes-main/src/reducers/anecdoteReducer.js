import {createSlice} from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

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
    handleVoteButton(state, action){
      const updateAnecdote = action.payload
      const itemToChange = state.find(anecdote => anecdote.id === updateAnecdote.id)
      return state.map(anecdote => anecdote.id !== itemToChange.id ? anecdote : updateAnecdote)
    },
    setAnecdotes(state, action){
    return action.payload
    },
    appendAnecdotes(state, action){
      return state.concat(action.payload)
    },
 }
})

export const initializeAnecdotes = () => {
 return async dispatch => {
  const anecdotes = await anecdotesService.getAll()
dispatch(setAnecdotes(anecdotes))
 }
}

export const createNew = (content) => {
  return async dispatch => {
  const newAnecdote = await anecdotesService.createNew(content)
  dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
return async dispatch => {
  const updatedAnecdote = await anecdotesService.updateVotes(anecdote)
  dispatch(handleVoteButton(updatedAnecdote))
}
}

export default anecdoteSlice.reducer
export const {handleVoteButton, setAnecdotes, appendAnecdotes} = anecdoteSlice.actions