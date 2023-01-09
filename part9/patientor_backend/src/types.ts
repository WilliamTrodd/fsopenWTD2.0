export type Gender = 'male' | 'female' | 'other';

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
