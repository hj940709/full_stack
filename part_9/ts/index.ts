import express from 'express';
import { BMICalculator } from './src/bmiCalculator';
import { ExerciseCalculator } from './src/exerciseCalculator';

const app = express();
app.use(express.json());
app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try{
        const height = Number(req.params.height);
        const weight = Number(req.params.weight);
        if(isNaN(height)||isNaN(weight)) throw new Error('Provided values were not numbers!');
        const bmi: string = BMICalculator(height, weight);
        res.json({height, weight, bmi});
    }catch (e) {
        res.json({error: 'malformatted parameters'});
    }
    
});

app.post('/exercises', (req, res) => {
    const dailyExercises: number[] = req.body.daily_exercises;
    const target: number = req.body.target;
    if(dailyExercises==null ||target==null){
        res.status(400).json({error: 'missing parameters'});
        return;
    }
    try{
        res.json(ExerciseCalculator(target, dailyExercises));
    }catch (e) {
        res.status(403).json({error: 'malformatted parameters'});
    }
    
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});