import patientsData from '../../data/patients.json';
import { NonSensitiveData, Patient } from '../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getAll = (): Array<Patient> => patients;

const getNonSensitive = (): NonSensitiveData[] => patients.map(({
  id, dateOfBirth, gender, occupation,
}) => ({
  id, dateOfBirth, gender, occupation,
}));

export default {
  getAll,
  getNonSensitive,
};
