import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients.json';
import { NewPatient, NonSensitiveData, Patient } from '../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getAll = (): Array<Patient> => patients;

const getNonSensitive = (): NonSensitiveData[] => patients.map(({
  id, dateOfBirth, gender, occupation,
}) => ({
  id, dateOfBirth, gender, occupation,
}));

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getNonSensitive,
  addPatient,
};
