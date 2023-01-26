import diagnosisData from "../../data/diagnoses.json";
import { Diagnose, NonSensitiveDiagnoseEntry } from "../types/types";

const getEntries = (): Diagnose[] => {
  return diagnosisData;
};

const getNonSensitiveDiagnosesEntries = (): NonSensitiveDiagnoseEntry[] => {
  return diagnosisData.map(({ code, name }) => ({ code, name }));
};

const addDiagnosis = () => {
  return [];
};

export default {
  getEntries,
  addDiagnosis,
  getNonSensitiveDiagnosesEntries,
};
