{/*Exercises 1.1-1.2 */}
{/*Exercises 1.3-1.5 */}

const Header = (props) =>{
  console.log(props);
  return <h1>{props.course}</h1>
}

const Part = (props) =>{
  return (<>
<p>{props.part1} {props.exercises1}</p>
<p>{props.part2} {props.exercises2}</p>    
<p>{props.part3} {props.exercises3}</p>
</>
  )
}

const Content=(props)=>{
return (<>
<div>
<Part part1={props.course.parts[0].name} exercises1={props.course.parts[0].exercises}/>
<Part part2={props.course.parts[1].name} exercises2={props.course.parts[1].exercises}/>
<Part part3={props.course.parts[2].name} exercises3={props.course.parts[2].exercises}/> 
</div>
</>
)
}

const Total= (props)=>{
return <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
}

const App = () => {
const course ={
name:  'Half Stack application development',
parts:[
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },{
    name: 'State of a component',
    exercises: 14
  }
]
  }

    return (
      <div>
        <Header course={course.name}/>
        <Content course={course}/>
        <Total course={course} />
       
      </div>
    )
  }



export default App;
