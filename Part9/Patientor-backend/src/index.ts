import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoseRoutes'
import patientsRouter from './routes/patientsRoutes'

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('dist'))
app.use(cors())

// const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnose', diagnoseRouter)

app.use('/api/patients', patientsRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});