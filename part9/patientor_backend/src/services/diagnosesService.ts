import diagnosesData from '../../data/diagnoses.json';
import { Diagnoses } from '../types';

const diagnoses: Array<Diagnoses> = diagnosesData as Array<Diagnoses>;

const getAll = (): Array<Diagnoses> => diagnoses;

export default {
  getAll,
};
