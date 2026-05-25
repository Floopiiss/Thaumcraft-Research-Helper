// Libraries/Utils
import { useState } from "react";
import { getAspectsForVersion } from "./utils";
// CSS
import "./App.css";
// SVGs
import Moon from "./assets/moon.svg?react";
import Sun from "./assets/sun.svg?react";
// import Catppuccin from "./assets/catppuccin.svg?react";
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

type VersionKey = keyof typeof verList;
type AspectKey = keyof typeof translate;
type WindowState = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function App() {
  const defaultVersion = Object.keys(verList)[0] as VersionKey;
  const [version, setVersion] = useState<VersionKey>(defaultVersion);

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
      <Moon style={{ color: "var(--scheme-icon)" }} />
      <Sun style={{ color: "var(--scheme-icon)" }} />
      {/* <Catppuccin /> */}
    </>
  );
}

export default App;
