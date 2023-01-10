import { NewPatient, Gender } from './types';

// type guards
const isString = (text: unknown): text is string => typeof text === 'string' || text instanceof String;
const isDate = (date: string): boolean => Boolean(Date.parse(date));
const isGender = (param: any): param is Gender => Object.values(Gender).includes(param);

// parsers
const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};
const parseOccupation = (occ: unknown): string => {
  if (!occ || !isString(occ)) {
    throw new Error(`Incorrect or missing occupation: ${occ}`);
  }
  return occ;
};

type Fields = {dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};
const toNewPatient = ({
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient = {
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };
  return newPatient;
};

export default toNewPatient;
