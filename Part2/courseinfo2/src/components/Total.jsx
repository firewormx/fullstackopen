
const Total= ({parts})=>{

   const totalAmount = parts.reduce((total, current)=>total + current.exercises, 0);
    return <p>Total of {totalAmount} exercises</p>
}

    export default Total