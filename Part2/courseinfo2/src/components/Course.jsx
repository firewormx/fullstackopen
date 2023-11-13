import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({course}) =>{
const name = course.name;
const parts = course.parts;

return (
<>
<Header name={name}/>
<Content parts={parts}/>
<Total parts={parts}/>
</>
)
}

export default Course;