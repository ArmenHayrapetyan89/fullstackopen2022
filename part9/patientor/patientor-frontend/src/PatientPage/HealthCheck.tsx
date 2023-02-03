import { Entry } from "../types";

const HealthCheck: React.FC<{ entry: Entry }> = ({ entry }) => (
  <div>
    {entry.date} {entry.description}
  </div>
);

export default HealthCheck;
