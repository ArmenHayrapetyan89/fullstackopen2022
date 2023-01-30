export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export type NonSensitiveDiagnoseEntry = Omit<Diagnose, "latin">;

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;
//export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;
