import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Diagnosis, Patient } from "../types";
import { useState } from "react";
import EntryDetails from "./EntryDetails";

const PatientPage = () => {
  const [{ patients }] = useStateValue();

  const { id } = useParams<{ id: string }>();

  const patient = Object.values(patients).find((patient) => patient.id === id);

  const [individualPatient, setIndividualPatient] = useState({});
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async () => {
      try {
        if (!patient) {
          return <div>loading...</div>;
        }
        const actualPatient = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients/${patient.id}`
        );

        setIndividualPatient(actualPatient.data);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [patient]);

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiagnoses = async () => {
      try {
        const actualDiagnoses = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );

        setDiagnoses(diagnoses.concat(actualDiagnoses.data));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, []);

  if (Object.keys(individualPatient).length === 0 || !patient || !diagnoses) {
    return <div>loading...</div>;
  }

  const diagnosesCodes = (individualPatient as Patient).entries.flatMap(
    (entry) => entry.diagnosisCodes
  );

  const filteredDiagnoses = diagnoses.filter((diagnosis) =>
    diagnosesCodes.includes(diagnosis.code)
  );

  console.log(filteredDiagnoses);

  return (
    <div>
      <h2>{(individualPatient as Patient).name}</h2>
      <p>ssh: {(individualPatient as Patient).ssn}</p>
      <p>occupation: {(individualPatient as Patient).occupation}</p>
      <h3>entries</h3>

      {(individualPatient as Patient).entries.map((entry) => {
        return (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
          </div>
        );
      })}
      <ul>
        {filteredDiagnoses.map((diagnosis) => {
          return (
            <li key={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );

  /*return (
    <div>
      <h2>{(individualPatient as Patient).name}</h2>
      <p>occupation: {(individualPatient as Patient).occupation}</p>
      <h3>entries</h3>

      {(individualPatient as Patient).entries.map((entry) => {
        return (
          <div key={entry.id}>
            {entry.date} {entry.description}
          </div>
        );
      })}
      <ul>
        {filteredDiagnoses.map((diagnosis) => {
          return (
            <li key={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );*/
};

export default PatientPage;
