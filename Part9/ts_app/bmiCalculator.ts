function calculateBmi (height: number, weight:number) : string{
const heightM = height / 100
const bmi = weight / (heightM * heightM)
if(bmi <=18.5){
return 'Underweight'
}else if (bmi > 18.5 && bmi <=24.9){
    return 'Normal range'
}else if (bmi > 25 && bmi <=29.9){
return 'Over range'
}else if (bmi>= 30){
    return 'Obese'
}
}
console.log(calculateBmi(180, 74))