import { useState } from 'react'

const StatisticLine = (props)=>{
    return <>
    <tr>
    <th>{props.text}</th>
    <td>{props.value}</td>
    </tr>
  </>
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
 <h2>Statistics</h2>
 <table>
  <tbody>
   <StatisticLine value={props.good} text="good"/>
   <StatisticLine value={props.neutral} text="neutral"/>
   <StatisticLine value={props.bad} text="bad"/>
   <StatisticLine value={props.all} text="total"/>
   <StatisticLine value={props.average} text="average"/>
   <StatisticLine value={props.positive} text="positive"/>
   </tbody>
    </table>
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

  <Statistics good={good} neutral={neutral} bad={bad} all={total} 
  average={average} positive={positive}/>
    </>)
  }

}

export default App