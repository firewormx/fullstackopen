import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors())
app.use(express.static('dist'))
app.use(express.json());


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


app.get('/api/patients', (_req, res) => {
  console.log('check patients info here');
  res.send('patients info')
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});