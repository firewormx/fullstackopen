import { useState } from 'react'

const Statistics = props =>{
 return <>
 <div>
  <h2>Statistics</h2>
    <p>good {props.good}</p> 
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p> 
    <p>all {props.total}</p>
    <p>average {props.average || ""}</p>
    <p>positive {props.positive || ""}%</p>
    </div>
    </>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0);


  const handleGoodincrement = ()=>{
    setGood(good + 1);
    setTotal(total + 1);

  }
  const handleNeutralIncrement = () =>{
    setNeutral(neutral + 1)
    setTotal(total + 1)


  }
  const handleBadIncrement = ()=>{
    setBad(bad + 1);
    setTotal(total+1);

  }
const sum = good *1 +neutral * 0 + bad *(-1);
const average = sum / total;
const positive = good / total * 100;

if(total === 0){
  return (
<div>
<div>
      <h2>give feedback</h2>
   <button onClick={handleGoodincrement}>good</button>
   <button onClick={handleNeutralIncrement}>neutral</button>
   <button onClick={handleBadIncrement}>bad</button>
    </div> 
<h2>Statistics</h2>
<p>No feedback given</p>
</div>
  )}else{
   return (<>
    <div>
      <h2>give feedback</h2>
   <button onClick={handleGoodincrement}>good</button>
   <button onClick={handleNeutralIncrement}>neutral</button>
   <button onClick={handleBadIncrement}>bad</button>
    </div> 

  <Statistics good={good} neutral={neutral} bad={bad} total={total} 
  average={average} positive={positive}/>
    </>)
  }

}

export default App