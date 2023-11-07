import { useState } from 'react'


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

  return (<>
    <div>
      <h2>give feedback</h2>
   <button onClick={handleGoodincrement}>good</button>
   <button onClick={handleNeutralIncrement}>neutral</button>
   <button onClick={handleBadIncrement}>bad</button>
    </div>
    <div>
     <h2>statistics</h2>
    <p>good {good}</p> 
    <p>neutral {neutral}</p>
    <p>bad {bad}</p> 
    <p>all {total}</p>
    <p>sum {sum}</p>
    <p>average {average || ""}</p>
    <p>positive {positive || ""}%</p>
    </div>
    </> )
}

export default App