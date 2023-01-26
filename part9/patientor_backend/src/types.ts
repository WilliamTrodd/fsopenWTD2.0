// eslint-disable-next-line no-shadow
export enum Gender {
  Male='male',
  Female='female',
  Other='other'
}

export enum EntryType {
  Hospital='Hospital',
  Health='HealthCheck',
  Occupational='OccupationalHealthcare'
}

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}
interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge? : Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitiveData = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

type EntryOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = EntryOmit<Entry, 'id'>;
