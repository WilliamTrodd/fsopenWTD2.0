import {
  Gender, NewEntry, Entry, NewPatient, EntryType, SickLeave, Discharge, HealthCheckRating, Diagnoses,
} from './types';

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
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

type Fields = {dateOfBirth: unknown,
               ssn: unknown,
               gender: unknown,
               occupation: unknown,
               name: unknown
               entries: Entry[]
              };
export const toNewPatient = ({
  dateOfBirth,
  ssn,
  gender,
  occupation,
  name,
  entries,
}: Fields): NewPatient => {
  const newPatient = {
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    name: parseName(name),
    entries,
  };
  return newPatient;
};

interface BaseEntryFields {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
}

interface HospitalFields extends BaseEntryFields {
  type: unknown;
  discharge?: unknown;
}
interface OccupationalFields extends BaseEntryFields {
  type: unknown;
  employerName: unknown;
  sickLeave?: unknown;
}

interface HealthCheckFields extends BaseEntryFields {
  type: unknown;
  healthCheckRating: unknown;
}
/*
type EntryFields = HospitalFields | OccupationalFields | HealthCheckFields;
*/
const isEntryType = (param: any): param is EntryType => Object.values(EntryType).includes(param);

const isCodes = (codes: any): codes is Array<Diagnoses['code']> => {
  if (!codes || codes.some((e: any) => typeof e !== 'string')) {
    return false;
  }
  return true;
};
const isDisc = (disc: any): disc is Discharge => {
  const date = 'date' in disc;
  const criteria = 'criteria' in disc;
  return date && criteria;
};
const isRating = (param: any): param is HealthCheckRating => (
  Object.values(HealthCheckRating).includes(param)
);
const isSickLeave = (object: any): object is SickLeave => {
  const { startDate } = object;
  const { endDate } = object;
  return isDate(startDate) && isDate(endDate);
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error(`Incorrect or missing entry type: ${entryType}`);
  }
  return entryType;
};

const parseDescription = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error(`Incorrect or missing description: ${desc}`);
  }
  return desc;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSpecialist = (spec: unknown): string => {
  if (!spec || !isString(spec)) {
    throw new Error(`Incorrect or missing specialist: ${spec}`);
  }
  return spec;
};

const parseDiagnosesCodes = (codes: unknown): Array<Diagnoses['code']> => {
  if (!isCodes(codes)) {
    throw new Error(`Incorrect or missing codes ${codes}`);
  }
  return codes;
};

const parseDischarge = (disc: unknown): Discharge => {
  if (!disc || !isDisc(disc)) {
    throw new Error(`Incorrect or missing discharge: ${disc}`);
  }
  return disc;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    throw new Error(`Incorrect or missing rating: ${rating}`);
  }
  return rating;
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || !isSickLeave(object)) {
    throw new Error(`Incorrect or missing sick leave: ${object}`);
  }
  return object;
};
/*
const toHealthEntry = (fields: HealthCheckFields) : NewEntry => {
  const newEntry = {
    description: parseDescription(fields.description),
    date: parseDate(fields.date),
    specialist: parseSpecialist(fields.specialist),
    diagnosisCodes: parseDiagnosesCodes(fields.diagnosisCodes),
    type: parseEntryType(fields.type),
    healthCheckRating: parseHealthCheckRating(fields.healthCheckRating),
  };
  return newEntry;
};

const toOccEntry = (fields: OccupationalFields): NewEntry => {
  let newEntry: NewEntry = {
    description: parseDescription(fields.description),
    date: parseDate(fields.date),
    specialist: parseSpecialist(fields.specialist),
    diagnosisCodes: parseDiagnosesCodes(fields.diagnosisCodes),
    type: parseEntryType(fields.type),
    employerName: parseEmployerName(fields.employerName),
  };
  if (fields.sickLeave) {
    newEntry = { ...newEntry, sickLeave: parseSickLeave(fields.sickLeave) };
  }
  return newEntry;
};
*/
const toHospitalEntry = (fields: HospitalFields): NewEntry => {
  let newEntry: NewEntry = {
    description: parseDescription(fields.description),
    date: parseDate(fields.date),
    specialist: parseSpecialist(fields.specialist),
    type: 'Hospital',
  };
  if (fields.discharge) {
    newEntry = { ...newEntry, discharge: parseDischarge(fields.discharge) };
  }
  if (fields.diagnosisCodes) {
    newEntry = { ...newEntry, diagnosisCodes: parseDiagnosesCodes(fields.diagnosisCodes) };
  }
  return newEntry;
};

const toHealthEntry = (fields: HealthCheckFields): NewEntry => {
  let newEntry: NewEntry = {
    description: parseDescription(fields.description),
    date: parseDate(fields.date),
    specialist: parseSpecialist(fields.specialist),
    diagnosisCodes: parseDiagnosesCodes(fields.diagnosisCodes),
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(fields.healthCheckRating),
  };
  if (fields.diagnosisCodes) {
    newEntry = { ...newEntry, diagnosisCodes: parseDiagnosesCodes(fields.diagnosisCodes) };
  }
  return newEntry;
};
const toOccEntry = (fields: OccupationalFields): NewEntry => {
  let newEntry: NewEntry = {
    description: parseDescription(fields.description),
    date: parseDate(fields.date),
    specialist: parseSpecialist(fields.specialist),
    diagnosisCodes: parseDiagnosesCodes(fields.diagnosisCodes),
    type: 'OccupationalHealthcare',
    employerName: parseEmployerName(fields.employerName),
  };
  if (fields.sickLeave) {
    newEntry = { ...newEntry, sickLeave: parseSickLeave(fields.sickLeave) };
  }
  if (fields.diagnosisCodes) {
    newEntry = { ...newEntry, diagnosisCodes: parseDiagnosesCodes(fields.diagnosisCodes) };
  }
  return newEntry;
};

export const toNewEntry = (entry: any): NewEntry => {
  const entryType = parseEntryType(entry.type);
  switch (entryType) {
    case 'Hospital':
      return toHospitalEntry(entry);
    case 'HealthCheck':
      return toHealthEntry(entry);
    case 'OccupationalHealthcare':
      return toOccEntry(entry);
    default:
      throw new Error('Something went wrong..');
  }
};
