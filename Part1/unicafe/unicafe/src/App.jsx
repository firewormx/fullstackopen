import { useState } from 'react'

const StatisticLine = (props)=>{
  return <p>good {props.value}</p>
}

const StatisticLine2 = props =>{
  return <p>neutral {props.value}</p>
}

const StatisticLine3 = props =>{
  return <p>bad {props.value}</p>
}

const StatisticLine4 = props =>{
  return <p>total {props.value}</p>
}

const StatisticLine5 = props =>{
  return <p>average {props.value}</p>
}

const StatisticLine6 = props =>{
  return <p>positive {props.value}</p>
}
const Button = (props) =>{
  return <>
  <button onClick={props.onGoodincrement}>good</button>
   <button onClick={props.onNeutralIncrement}>neutral</button>
   <button onClick={props.onBadIncrement}>bad</button>
  </>

}


const Statistics = props =>{
 return <>
 <div>
  <h2>Statistics</h2>
   <StatisticLine value={props.good} text="good"/>
   <StatisticLine2 value={props.neutral} text="neutral"/>
   <StatisticLine3 value={props.bad} text="bad"/>
   <StatisticLine4 value={props.total} text="total"/>
   <StatisticLine5 value={props.average} text="average"/>
   <StatisticLine6 value={props.positive} text="positive"/>
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
      <Button onGoodincrement={handleGoodincrement} 
      onNeutralIncrement={handleNeutralIncrement}
      onBadIncrement={handleBadIncrement} 
      />
    </div> 
<h2>Statistics</h2>
<p>No feedback given</p>
</div>
  )}else{
   return (<>
    <div>
      <h2>give feedback</h2>
      <Button onGoodincrement={handleGoodincrement} 
      onNeutralIncrement={handleNeutralIncrement}
      onBadIncrement={handleBadIncrement} 
      />
    </div> 

  <Statistics good={good} neutral={neutral} bad={bad} total={total} 
  average={average} positive={positive}/>
    </>)
  }

}

export default App