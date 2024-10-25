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

type DailyHours = [number, number, number, number, number, number, number]

const calculateExercises = (dailyHrs: DailyHours, target: number): ResultObj => {
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




console.log(calculateExercises([3, 0, 2, 4.5, 0,3, 1], 2))