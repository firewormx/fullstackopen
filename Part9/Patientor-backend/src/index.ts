require('dotenv').config()
import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoseRoutes'
import patientsRouter from './routes/patientsRoutes'

const app = express();

app.use(express.json());
app.use(express.static('dist'))
app.use(cors())

// Root route
app.get('/api', (_req, res) => {
  res.send('Welcome to the Patientor API');
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnose', diagnoseRouter)

app.use('/api/patients', patientsRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} from .env ${process.env.PORT}`);
});