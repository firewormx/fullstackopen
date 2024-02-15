import Part from "./Part";

const Content=({parts})=>{
const part = parts.map(part =>{return <Part key={part.id} parts={part}/>})
return (
    <div> 
   {part}
    </div>
    )
}
    export default Content;