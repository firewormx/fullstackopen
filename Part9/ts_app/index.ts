import express from 'express';
const app = express();
app.use(express.json());

import {calculateBmi } from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

app.get('/hello', (_req, res) => {
res.send('Hello Full Stack!');
});

// /bmi?height=${height}&weight=${weight}
app.get('/bmi', (req, res)=> {
 const height= Number(req.query.height);
 const weight = Number(req.query.weight);
 const bmi  =  calculateBmi(height, weight);

    if(isNaN(height) || isNaN(weight)){
      res.json({error: 'malformatted parameters'}).status(400);
    }else{
      res.json({
         weight,
         height,
         bmi
      }).status(200);
    }
    });

   app.post('/exercises', (req, res) => {
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if(!target || !daily_exercises){
      res.status(400).send({error:'parameters missing'});
    }else if(!Array.isArray(daily_exercises) || !isNaN(Number(target))){
      res.status(400).send({error: 'malformatted parameters'});
    }

    const result = calculateExercises(Number(target), daily_exercises as number[]);
    res.send({result});
   });

    const PORT = 3003;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
