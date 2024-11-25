import express from 'express';
import cors from 'cors'
import diaryRouter from './routes/diaries';

const app = express();
app.use(cors())
app.use(express.static('dist'))
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

// app.use('/api/diaries', diaryRouter);
app.use('/', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});