import translate from "../../data/translation_dict.json";
import type { ConnectionResult } from "../../types/types";
import "./ConnectionWindowContent.css";

type Props = {
  connection: ConnectionResult;
};

export default function ConnectionWindowContent({ connection }: Props) {
  if (!connection) {
    return <p>No connection found.</p>;
  }

  return (
    <>
      <ol className="content-container connection-path">
        {connection.path.map((aspect, index) => (
          <li
            key={aspect}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <img
              src={
                new URL(
                  `../../assets/colour/${translate[aspect] ?? aspect}.png`,
                  import.meta.url,
                ).href
              }
              alt={translate[aspect] ?? aspect}
              style={{ width: "40px", height: "40px" }}
            />
            {/* <span>{translate[aspect] ?? aspect}</span> */}
            {index < connection.path.length - 1 && (
              <span aria-hidden="true"> =&gt; </span>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
