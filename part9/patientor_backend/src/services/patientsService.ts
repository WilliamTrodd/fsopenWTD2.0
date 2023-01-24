import { v1 as uuid } from 'uuid';
// import patientsData from '../../data/patients.json';
import tsPatientsData from '../../data/patients';
import {
  NewPatient, NonSensitiveData, Patient, NewEntry, Entry,
} from '../types';

const patients: Array<Patient> = tsPatientsData as Array<Patient>;

const getAll = (): Array<Patient> => patients;

const getNonSensitive = (): NonSensitiveData[] => patients.map(({
  id, dateOfBirth, gender, occupation, name, entries,
}) => ({
  id, dateOfBirth, gender, occupation, name, entries,
}));

const findById = (id: string): Patient | undefined => {
  const found: Patient | undefined = patients.find((patient) => patient.id === id);
  return found;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const foundIndex: number = patients.findIndex((p) => p.id === id);
  if (foundIndex !== -1) {
    const newEntry = {
      id: uuid(),
      ...entry,
    };
    // eslint-disable-next-line max-len
    patients[foundIndex] = {
      ...patients[foundIndex],
      entries: patients[foundIndex].entries.concat(newEntry as Entry),
    };

    return patients[foundIndex];
  }
  return undefined;
};

export default {
  getAll,
  getNonSensitive,
  addPatient,
  findById,
  addEntry,
};
