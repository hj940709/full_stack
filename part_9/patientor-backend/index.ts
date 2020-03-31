import express from 'express';
import diagnoseRouter from './src/routers/diagnoseRouter';
import patientRouter from './src/routers/patientRouter';
const app = express();
app.use(express.json());
app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const PORT = 3001;

app.get('/api/ping', (_req, res) => { 
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);
    

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});