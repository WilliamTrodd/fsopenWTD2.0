import {
  NewPatient, Gender, Entry, NewEntry, EntryType,
  Discharge, Diagnoses, HealthCheckRating, SickLeave,
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

type BaseEntryFields = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes: unknown
  type: unknown,
};

interface HospitalFields extends BaseEntryFields {
  discharge: unknown
}
interface OccupationalFields extends BaseEntryFields {
  employerName: unknown,
  sickLeave: unknown
}

interface HealthCheckFields extends BaseEntryFields {
  healthCheckRating: unknown
}

type EntryFields =
  | HospitalFields
  | OccupationalFields
  | HealthCheckFields;

const isEntryType = (param: any): param is EntryType => Object.values(EntryType).includes(param);
const isCodes = (codes: any): codes is Array<Diagnoses['code']> => {
  if (!Array.isArray(codes)) {
    return false;
  }
  if (codes.some((e) => typeof e !== 'string')) {
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
  if (!codes) {
    return [];
  }
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

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (!object) {
    return undefined;
  }
  if (!isSickLeave(object)) {
    throw new Error(`Incorrect or missing sick leave: ${object}`);
  }
  return object;
};

const toHospitalEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  discharge,
}: HospitalFields) : NewEntry => {
  const newEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosesCodes(diagnosisCodes),
    type: parseEntryType(type),
    discharge: parseDischarge(discharge),
  };
  return newEntry;
};

const toHealthEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
}: HealthCheckFields) : NewEntry => {
  const newEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosesCodes(diagnosisCodes),
    type: parseEntryType(type),
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
  };
  return newEntry;
};

const toOccEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  employerName,
  sickLeave,
}: OccupationalFields): NewEntry => {
  const newEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosesCodes(diagnosisCodes),
    type: parseEntryType(type),
    employerName: parseEmployerName(employerName),
    sickLeave: parseSickLeave(sickLeave),
  };
  return newEntry;
};

export const toNewEntry = (entry: EntryFields): NewEntry => {
  const entryType = parseEntryType(entry.type);
  switch (entryType) {
    case 'Hospital':
      return toHospitalEntry(entry as HospitalFields);
    case 'HealthCheck':
      return toHealthEntry(entry as HealthCheckFields);
    case 'OccupationalHealthcare':
      return toOccEntry(entry as OccupationalFields);
    default:
      throw new Error(`Entry: ${entry} could not be added`);
  }
};
