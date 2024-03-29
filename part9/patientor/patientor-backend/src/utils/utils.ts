import { Gender, NewPatientEntry } from "../types/types";

const isString = (property: unknown): property is string => {
  return typeof property === "string" || property instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name!");
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error("Incorrect or missing dateOfBirth!");
  }

  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing dateOfBirth!");
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender)
    .map((value) => value.toLowerCase())
    .includes(param.toLowerCase());
};

const parseGender = (gender: unknown): Gender => {
  console.log("GENDER: ", gender);
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender!");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation!");
  }
  return occupation;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    entries: [],
    occupation: parseOccupation(occupation),
  };

  return newEntry;
};

export default toNewPatientEntry;
