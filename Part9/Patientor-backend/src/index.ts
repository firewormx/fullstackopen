import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoseRoutes'
import patientsRouter from './routes/patientsRoutes'

const app = express();
app.use(cors())
app.use(express.static('dist'))
app.use(express.json());


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnose', diagnoseRouter)

app.use('/api/patients', patientsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});