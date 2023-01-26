import patientData from "../../data/patients.json";
import { Patient, NonSensitivePatientEntry } from "../types/types";

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatientsEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return [];
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientsEntries,
};
