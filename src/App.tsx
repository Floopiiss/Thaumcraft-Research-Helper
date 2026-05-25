// Libraries/Utils
import { useEffect, useState } from "react";
import { getAspectsForVersion } from "./utils";
import type { VersionKey, AspectKey, WindowState } from "./types/types.d.ts";

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
import FindConnectionBtn from "./components/FindConnectionBtn";
import ConnectionWindow from "./components/ConnectionWindow";
import ButtonRow from "./components/ButtonRow";

function App() {
  const defaultVersion = Object.keys(verList)[0] as VersionKey;
  const [version, setVersion] = useState<VersionKey>(() => {
    try {
      return (localStorage.getItem("version") as VersionKey) ?? defaultVersion;
    } catch {
      return defaultVersion;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("version", version);
    } catch {
      // ignore
    }
  }, [version]);

  const aspects = getAspectsForVersion(version) as AspectKey[];

  const defaultAspect = aspects[0] ?? (Object.keys(translate)[0] as AspectKey);

  const defaultSteps = 1;
  const [steps, setSteps] = useState(defaultSteps);

  const [selectedTo, setSelectedTo] = useState<AspectKey>(defaultAspect);
  const [selectedFrom, setSelectedFrom] = useState<AspectKey>(defaultAspect);

  const [showConnectionWindow, setShowConnectionWindow] = useState(false);
  const [connectionWindow, setConnectionWindow] = useState<WindowState>({
    x: 100,
    y: 100,
    width: 320,
    height: 200,
  });

  return (
    <>
      <div>
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
        <FindConnectionBtn onClick={() => setShowConnectionWindow(true)} />
      </div>
      {showConnectionWindow && (
        <ConnectionWindow
          x={connectionWindow.x}
          y={connectionWindow.y}
          width={connectionWindow.width}
          height={connectionWindow.height}
          onMove={({ x, y }) =>
            setConnectionWindow((current) => ({ ...current, x, y }))
          }
          onResize={({ width, height, x, y }) =>
            setConnectionWindow({ x, y, width, height })
          }
          onClose={() => setShowConnectionWindow(false)}
        />
      )}
      <ButtonRow />
    </>
  );
}

export default App;
