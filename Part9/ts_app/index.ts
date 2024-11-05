import express from 'express';
import {calculateBmi } from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator'

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
res.send('Hello Full Stack!');
});

// /bmi?height=${height}&weight=${weight}
app.get('/bmi', (req, res)=> {
 const height= Number(req.query.height);
 const weight = Number(req.query.weight);

    if(isNaN(height) || isNaN(weight)){
      res.send({error: 'malformatted parameters'}).status(400);
    }
 const bmi  =  calculateBmi(height, weight);

 res.send({
    weight,
    height,
    bmi
 }).status(200);
    });

   //  type DailyHours = number[];

    app.post('/exercises', (req, res) => {
      const target = <number>req.body
      const dailyHrs = req.body

      if(!target || isNaN(Number(target))){
         return res.status(400).send({eror: 'parameters missing'})
      }
      if(!dailyHrs){
         return res.status(400).send({error:'malformatted parameters'})
      }

      const result = calculateBmi(Number(target), dailyHrs)
     return  res.send({result})
    })


    const PORT = 3004;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
