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

interface Calculate{
    target: number,
    time: number[]
}

const parseArgs = (args: string[]): Calculate => {
if(args.length < 4) throw new Error('not enough arguments');
const times: number[] = [];
//i for times
for(let i = 3; i < args.length; i++){
if(isNaN(Number(args[2])) && isNaN((Number(args[3])))){
    throw new Error('provided values are not numbers!');
}else{
    times.push(Number(args[i]));
}
}
return {
    target: Number(args[2]),
    time: times
};
};
type DailyHours = number[];

export const calculateExercises = (target: number, dailyHrs: DailyHours): ResultObj => {
    const periodLength = dailyHrs.length;
    const trainingDays = dailyHrs.filter(hr => hr !== 0).length;
    const average = dailyHrs.reduce((current, total)=>  current + total, 0) / dailyHrs.length;
    const  success =  average >= target ;

const rates = (average: number, target: number): number => {
const myRating = average / target;
if(myRating >=1){
    return 3;
}else if(myRating >= 0.8){
    return 2;
}else{
    return 1;
}
    };

    const descreptions = (rating: number) : string=> {
  if(rating === 1){
    return 'Need to take more exercises!';
  }else if(rating === 2){
    return 'Not too bad but could be better.';
  }else{
    return 'Very excellent!';
  }
    };

    const rating = rates(average, target);
    const ratingDescription = descreptions(rating);

return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
};
    };

try{
const {target, time} = parseArgs(process.argv);
const result = calculateExercises(target, time);
console.log(result);
}catch(error:unknown){
let errorMessage = 'something went wrong.';
if(error instanceof Error){
errorMessage += ' Error: ' + error.message;
}
console.log(errorMessage);
}

// console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]))
// console.log(calculateExercises(2, [1, 0, 2, 4.5, 0, 3, 1, 0, 4]))