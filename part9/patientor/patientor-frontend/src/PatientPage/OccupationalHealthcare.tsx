import { Entry } from "../types";

const OccupationalHealthcare: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div>
    {entry.date} {entry.description}
  </div>
);

export default OccupationalHealthcare;
