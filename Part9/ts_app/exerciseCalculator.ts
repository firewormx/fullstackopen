// calculate the average time of daily exercise hrs, compare it to target amout of hrs and returns an obj:

interface ResultObj{ 
        periodLength: number,
        trainingDays: number,
        success: boolean,
        rating: number,
        ratingDescription: string,
        target: number,
        average: number
      }

type DailyHours = number[]

type MultipleValues = {
    value1: number,
    value2: number,
    value3: number,
    value4: number,
    value5: number,
    value6: number,
    value7: number,
    value8: number,
    value9: number,
    value10: number
}

const parseArgs = (args: string[]): MultipleValues  => {
if(args.length < 11) throw new Error('not enough arguments')
if(args.length > 11) throw new Error('too many arguments')
if(
!isNaN(Number(args[2])) && 
!isNaN(Number(args[3])) && 
!isNaN(Number(args[4])) &&
!isNaN(Number(args[5])) &&
!isNaN(Number(args[6])) &&
!isNaN(Number(args[7])) &&
!isNaN(Number(args[8])) &&
!isNaN(Number(args[9])) &&
!isNaN(Number(args[10])) &&
!isNaN(Number(args[11]))
){
return {
    value1: Number(args[2]),
    value2: Number(args[3]),
    value3: Number(args[4]), 
    value4: Number(args[5]), 
    value5: Number(args[6]), 
    value6: Number(args[7]), 
    value7: Number(args[8]), 
    value8: Number(args[9]), 
    value9: Number(args[10]),
    value10: Number(args[11])
}
}else{
    throw new Error('Provided values are not numbers!')
}
}

const calculateExercises = (target: number, dailyHrs: DailyHours): ResultObj => {
    const periodLength = dailyHrs.length;
    const trainingDays = dailyHrs.filter(hr => hr !== 0).length
    const average = dailyHrs.reduce((current, total)=>  current + total, 0) / dailyHrs.length
    let success =  average >= target ? true : false 
    let rating 
    let ratingDescription
if(success){
  rating = 3
  ratingDescription = 'very good! You did it!'
}else{
    rating = 2
    ratingDescription = 'not too bad but could be better'
}
return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
}
    }

try{
console.log(parseArgs(process.argv))
const {value1, value2, value3, value4, value5, value6,
    value7, value8, value9, value10 }= parseArgs(process.argv)

// const arrayValues = [value2, value3, value4, value5, value6, value7, value8, value9, value10]
calculateExercises(value1, [value2, value3, value4, value5, value6, value7, value8, value9, value10])

}catch(error:unknown){
let errorMessage = 'something went wrong.'
if(error instanceof Error){
errorMessage += ' Error: ' + errorMessage
}
console.log(errorMessage)
}

const target: number = Number(process.env[2])

const value2: number = Number(process.argv[3])
const value3 : number = Number(process.argv[4])
const value4 : number = Number(process.argv[5])
const value5 : number = Number(process.argv[6])
const value6 : number = Number(process.argv[7])
const value7 : number = Number(process.argv[8])
const value8 : number = Number(process.argv[9])
const value9 : number = Number(process.argv[10])
const value10 : number = Number(process.argv[11])

const dailyHrs = [value2, value3, value4, value5, value6, value7, value8, value9, value10]

console.log(calculateExercises(target, dailyHrs))

console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))
console.log(calculateExercises(2, [1, 0, 2, 4.5, 0, 3, 1, 0, 4]))