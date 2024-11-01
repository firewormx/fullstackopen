// it is better to inclu error handling
//and prepare for the unepected to happen. use 'switch..case' than 'if...else'
// command: npm run ts-node index.ts
// npm install --save-dev @types/react @types/express @types/lodash @types/jest @types/mongoose
// The @types/ are maintained by Definitely typed, a community project to maintain types of everything in one place.

type Operation = 'multiply' |'add'|'divide';// string literal types
type Result = number | string 

// const calculator = (a:number, b: number, op:Operation): Result => {
// if(op ==='multiply'){
//   return a * b
// }else if(op === 'add'){
// return a + b
// }else if(op === 'divide'){
//   if(b === 0) return 'this cannot be done'
//   return a/ b
// }
// }

export const calculator = (a: number, b: number, op: Operation): number => {
switch(op){
case 'multiply': return a * b;
case 'divide': 
  if(b === 0) throw new Error('Can\'t divide by 0!')
return a / b;
case 'add' : return a + b;
default: throw new Error('Operation is not multiply, add or divide!')
}
}

try{
  console.log(calculator(1, 5, 'divide'))
}catch(error: unknown){
  let errorMessage = 'Something went wrong: '
  // the type is narrowed through instancof and we can refer to error.message
  if(error instanceof Error){
    errorMessage += error.message;
  }
  console.log(errorMessage)
  console.log(process.argv)
}

console.log(`the result of calculator is ${calculator(8, 2, 'multiply')}`)

// const multiplicator = (a: number, b: number, printText: string) => {
//     console.log(printText,  a * b);
//   }
  
//   multiplicator(2, 4, 'Multiplied number 2 and 4, the result is:');

