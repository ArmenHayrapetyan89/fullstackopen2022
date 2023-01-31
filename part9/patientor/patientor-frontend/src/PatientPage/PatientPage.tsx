import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient } from "../types";
import { useState } from "react";

const PatientPage = () => {
  const [{ patients }] = useStateValue();

  const { id } = useParams<{ id: string }>();

  const patient = Object.values(patients).find((patient) => patient.id === id);

  const [individualPatient, setIndividualPatient] = useState({});

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

  if (Object.keys(individualPatient).length === 0 || !patient) {
    return <div>loading...</div>;
  }

  console.log("ENTRIES: ", (individualPatient as Patient).entries[0]);
  return (
    <div>
      <h2>{(individualPatient as Patient).name}</h2>
      <p>occupation: {(individualPatient as Patient).occupation}</p>
      <h3>entries</h3>
      {
        <ul>
          {(individualPatient as Patient).entries.map((entry) => {
            return (
              <div key={entry.id}>
                {entry.date} {entry.description}
                {entry?.diagnosisCodes?.map((code) => (
                  <li key={code}>{code}</li>
                ))}
              </div>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default PatientPage;
