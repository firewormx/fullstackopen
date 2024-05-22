
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

export const handleVoteButton = (id) => {
  return {
type:'Increment',
payload: {id} 
}
}

export const createNew = (content) => {
  return {
    type: 'Create',
    payload:{
content: content,
id:getId(),
votes: 0
    }
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
switch(action.type){
  case 'Create': return [...state, action.payload]
case 'Increment' : {
  const id = action.payload.id
  const AnecdoteToChange = state.find(a => a.id === id )
  const changedNote = {...AnecdoteToChange, votes: AnecdoteToChange.votes + 1}
  return state.map(anecdote => anecdote.id !== id ? anecdote :changedNote)
}
case 'reset': []
}

  return state
}

export default reducer