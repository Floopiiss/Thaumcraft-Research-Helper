// Libraries
import { useState } from "react";

// CSS
import "./App.css";

// Data
import verList from "./data/version_dict.json";
import translate from "./data/translation_dict.json";

type VersionKey = keyof typeof verList;
type AspectKey = keyof typeof translate;

// Component Imports
import VersionDropdown from "./components/VersionDropdown";
import FromAspect from "./components/FromAspect";
import { getAspectsForVersion } from "./utils";
import ToAspect from "./components/ToAspect";

function App() {
  const defaultVersion = Object.keys(verList)[0] as VersionKey;
  const [version, setVersion] = useState<VersionKey>(defaultVersion);

  const aspects = getAspectsForVersion(version) as AspectKey[];

  const defaultAspect = aspects[0] ?? (Object.keys(translate)[0] as AspectKey);

  const [selectedTo, setSelectedTo] = useState<AspectKey>(defaultAspect);
  const [selectedFrom, setSelectedFrom] = useState<AspectKey>(defaultAspect);

  return (
    <>
      <div>
        <VersionDropdown value={version} onChange={(v) => setVersion(v)} />

        <FromAspect
          version={version}
          value={selectedTo}
          onChange={(v) => setSelectedTo(v)}
        />

        <ToAspect
          version={version}
          value={selectedFrom}
          onChange={(v) => setSelectedFrom(v)}
        />
      </div>
    </>
  );
}

export default App;
