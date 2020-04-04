import express from 'express';
import patientService from '../services/patientService';
import {toNewPatientEntry, toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  res.json(patientService.getEntriesById(req.params.id));
});

router.post('/', (req, res) => {
  const newEntry = toNewPatientEntry(req.body);
  res.json(patientService.addPatientEntry(newEntry));
});

router.post('/:id/entries', (req, res) => {
  const newEntry = toNewEntry(req.body);
  res.json(patientService.addEntry(newEntry, req.params.id));
});

export default router;