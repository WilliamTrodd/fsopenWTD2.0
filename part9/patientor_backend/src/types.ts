// eslint-disable-next-line no-shadow
export enum Gender {
  Male='male',
  Female='female',
  Other='other'
}

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender,
  occupation: string;
}

export type NonSensitiveData = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;
