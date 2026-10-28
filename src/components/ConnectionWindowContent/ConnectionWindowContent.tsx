import type { ConnectionResult } from "../../types/types";

type Props = {
  connection: ConnectionResult;
};

export default function ConnectionWindowContent({ connection }: Props) {
  if (!connection) {
    return <p>No connection found.</p>;
  }

  return (
    <ol className="content-container">
      {connection.path.map((aspect) => (
        <li key={aspect}>{aspect}</li>
      ))}
    </ol>
  );
}
