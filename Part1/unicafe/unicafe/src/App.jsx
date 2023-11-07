import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodincrement = ()=>{
    setGood(good + 1);
  }
  const handleNeutralIncrement = () =>{
    setNeutral(neutral + 1)
  }
  const handleBadIncrement = ()=>{
    setBad(bad + 1);
  }
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
    </div>
    </> )
}

export default App