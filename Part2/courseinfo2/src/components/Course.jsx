import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({details}) =>{
const name = details.name;
const parts = details.parts;

return (
<>
<Header name={name}/>
<Content parts={parts}/>
<Total parts={parts}/>
</>
)
}

export default Course;