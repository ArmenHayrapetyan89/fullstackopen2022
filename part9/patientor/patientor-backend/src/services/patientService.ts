//import patientData from "../../data/patients.json";
import patientData from "../../data/patients";

import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  Gender,
} from "../types/types";
import { v4 as uuid } from "uuid";

const convertGender = (gender: any): Gender => {
  switch (gender.toLowerCase()) {
    case "male":
      return Gender.Male;
    case "female":
      return Gender.Female;
    default:
      return Gender.Other;
  }
};

const getEntries = (): Patient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      ssn,
      gender: convertGender(gender),
      occupation,
      entries,
    })
  );
};

const findById = (id: string): Patient => {
  const patient = patientData.find((patient) => patient.id === id);

  if (patient) {
    return patient;
  } else throw new Error(`Patient with id ${id} not found`);
};

const getNonSensitivePatientsEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: convertGender(gender),
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientData.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientsEntries,
  findById,
};
