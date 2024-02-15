import { useState } from 'react'

 const Button = (props) =>{
  return (
    <div>
    <button onClick={props.handleClick}>{props.text}</button>
    </div>
  )
 }

 const Title = (props) => {
  return <h2>{props.text}</h2>
 }

 const Anecdotes = (props) =>{
  return (<>
  <div>{props.anecdote}</div>
  <div>has {props.vote} votes</div>
  </>
  )
 }

 const MostVotes = (props) =>{
  return <>
  <div>{props.most}</div>
<div>has {props.max} votes</div>
  </>
 }
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [voted, setVoted]= useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  const  handleNextAnecdote = ()=>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const handleVoteAnecdote = () =>{
    const newVotes = [...voted];
    newVotes[selected] += 1;
    setVoted(newVotes);
  }

  const max= Math.max(...voted);
  const index = voted.indexOf(max);

  return (<>
  <Title text="Anecdote of the day"/>
  <Anecdotes  anecdote={anecdotes[selected]} vote={voted[selected]}/>
  <Button handleClick={handleVoteAnecdote} text="vote" />
<Button handleClick={handleNextAnecdote} text="next anecdote"/>
<Title text="Anecdote with most votes"/>
<MostVotes most={anecdotes[index]} max={max}/>
</>
  )
}

export default App
