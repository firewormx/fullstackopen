type PrintText = 'Underweight'|'Normal range'|'Over range'|'Obese'

type multiplyValues = {
    value1: number,
    value2: number
}

const parseArguments = (args: string[]): multiplyValues => {
if(args.length < 4) throw new Error('not enough arguments')
if(args.length > 4) throw new Error('too many arguments')

if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
        value1: Number(args[2]),
        value2: Number(args[3])
    }
}else{
    throw new Error('Provided values were not numbers!')
}
}

function calculateBmi (height: number, weight:number) : PrintText{
if(height === 0 || weight === 0) throw new Error('the value of weight or height cannot be zero.')
const heightM = height / 100
const bmi = weight / (heightM * heightM)
if(bmi < 18.5){
return 'Underweight'
}else if (bmi >= 18.5 && bmi <=24.9){
    return 'Normal range'
}else if (bmi >=25 && bmi <=29.9){
return 'Over range'
}else if (bmi>= 30){
    return 'Obese'
}
}
try{
    const {value1, value2} = parseArguments(process.argv)
    calculateBmi(value1, value2)
}catch(error: unknown){
    let errorMessage = 'Something error happened.'
    if(error instanceof Error){
    errorMessage +=` Error: ` + error.message
}
console.log(errorMessage)
}

// npm run calculateBmi 180 74
const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

// console.log(calculateBmi(180, 74))
console.log(calculateBmi(height, weight))
console.log(process.argv)