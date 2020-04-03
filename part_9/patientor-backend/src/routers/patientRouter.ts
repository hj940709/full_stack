import express from 'express';
import patientService from '../services/patientService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  res.json(patientService.getEntriesById(req.params.id));
});

router.post('/', (req, res) => {
  const newEntry = toNewDiaryEntry(req.body);
  res.json(patientService.addEntry(newEntry));
});

export default router;