import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitive());
});

router.get('/:id', (req, res) => {
  const foundPatient = patientsService.findById(req.params.id);
  res.json(foundPatient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const foundPatient = patientsService.findById(req.params.id);
    if (foundPatient) {
      const updated = patientsService.addEntry(foundPatient.id, newEntry);
      res.json(updated);
    }
  } catch (e) {
    res.status(403).send(e);
  }
});

/* TODO 9.23 add a POST endpoint to /api/patients/:id/entries */
/* Endpoint should support different types and check all required fields */

export default router;
