import { Entry } from "../types";

const Hospital: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div>
    {entry.date} {entry.description}
  </div>
);

export default Hospital;
