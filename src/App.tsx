// Libraries/Utils
import { useState } from "react";
import { getAspectsForVersion } from "./utils";
// CSS
import "./App.css";
// Data
import verList from "./data/version_dict.json";
import translate from "./data/translation_dict.json";
// Component Imports
import VersionDropdown from "./components/VersionDropdown";
import FromAspect from "./components/FromAspect";
import ToAspect from "./components/ToAspect";
import MinSteps from "./components/MinSteps";

type VersionKey = keyof typeof verList;
type AspectKey = keyof typeof translate;

function App() {
  const defaultVersion = Object.keys(verList)[0] as VersionKey;
  const [version, setVersion] = useState<VersionKey>(defaultVersion);

  const aspects = getAspectsForVersion(version) as AspectKey[];

  const defaultAspect = aspects[0] ?? (Object.keys(translate)[0] as AspectKey);

  const defaultSteps = 1;
  const [steps, setSteps] = useState(defaultSteps);

  const [selectedTo, setSelectedTo] = useState<AspectKey>(defaultAspect);
  const [selectedFrom, setSelectedFrom] = useState<AspectKey>(defaultAspect);

  return (
    <>
      <div className="gap-10">
        <div className="form-row">
          <div className="form-col">
            <VersionDropdown value={version} onChange={(v) => setVersion(v)} />
          </div>
          <div className="form-col">
            <MinSteps value={steps} onChange={(v) => setSteps(v)} />
          </div>
        </div>
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
