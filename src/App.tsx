// Libraries/Utils
import { useEffect, useRef, useState } from "react";
import { buildGraph, findConnection, getAspectsForVersion } from "./utils";
import type {
  VersionKey,
  AspectKey,
  WindowState,
  ConnectionResult,
} from "./types/types.d.ts";

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
  const defaultToAspect = aspects[1] ?? defaultAspect;

  const defaultSteps = 1;
  const [steps, setSteps] = useState(defaultSteps);

  const [selectedTo, setSelectedTo] = useState<AspectKey>(defaultToAspect);
  const [selectedFrom, setSelectedFrom] = useState<AspectKey>(defaultAspect);

  const [connectionWindows, setConnectionWindows] = useState<
    Array<WindowState & { id: number; connection: ConnectionResult }>
  >([]);
  const nextWindowId = useRef(0);

  function handleFindConnection() {
    if (selectedFrom === selectedTo) {
      return;
    }

    const graph = buildGraph(verList[version].combinations);
    const result = findConnection(graph, selectedFrom, selectedTo, steps);

    if (result) {
      const width = 320;
      const height = 200;
      const offset = connectionWindows.length * 24;
      const id = nextWindowId.current++;

      setConnectionWindows((current) => [
        ...current,
        {
          id,
          connection: result,
          width,
          height,
          x: Math.max(
            16,
            Math.min(
              window.innerWidth - width - 16,
              (window.innerWidth - width) / 2 + offset,
            ),
          ),
          y: Math.max(
            16,
            Math.min(
              window.innerHeight - height - 16,
              (window.innerHeight - height) / 2 + offset,
            ),
          ),
        },
      ]);
    }
  }

  function updateConnectionWindow(
    id: number,
    update: Partial<WindowState>,
  ) {
    setConnectionWindows((current) =>
      current.map((connectionWindow) =>
        connectionWindow.id === id
          ? { ...connectionWindow, ...update }
          : connectionWindow,
      ),
    );
  }

  function handleVersionChange(nextVersion: VersionKey) {
    const nextAspects = getAspectsForVersion(nextVersion) as AspectKey[];

    setVersion(nextVersion);
    setSelectedFrom(nextAspects[0] ?? (Object.keys(translate)[0] as AspectKey));
    setSelectedTo(
      nextAspects[1] ??
        nextAspects[0] ??
        (Object.keys(translate)[0] as AspectKey),
    );
  }

  return (
    <>
      <div>
        <div className="form-row">
          <div className="form-col">
            <VersionDropdown value={version} onChange={handleVersionChange} />
          </div>
          <div className="form-col">
            <MinSteps value={steps} onChange={(v) => setSteps(v)} />
          </div>
        </div>
        <FromAspect
          version={version}
          value={selectedFrom}
          onChange={(nextFrom) => {
            if (nextFrom === selectedTo) {
              setSelectedTo(selectedFrom);
            }
            setSelectedFrom(nextFrom);
          }}
        />
        <ToAspect
          version={version}
          value={selectedTo}
          onChange={(nextTo) => {
            if (nextTo === selectedFrom) {
              setSelectedFrom(selectedTo);
            }
            setSelectedTo(nextTo);
          }}
        />
        <FindConnectionBtn onClick={handleFindConnection} />
      </div>
      {connectionWindows.map((connectionWindow) => (
        <ConnectionWindow
          key={connectionWindow.id}
          id={connectionWindow.id}
          x={connectionWindow.x}
          y={connectionWindow.y}
          width={connectionWindow.width}
          height={connectionWindow.height}
          connection={connectionWindow.connection}
          onMove={({ x, y }) =>
            updateConnectionWindow(connectionWindow.id, { x, y })
          }
          onResize={({ width, height, x, y }) =>
            updateConnectionWindow(connectionWindow.id, {
              x,
              y,
              width,
              height,
            })
          }
          onClose={() =>
            setConnectionWindows((current) =>
              current.filter((window) => window.id !== connectionWindow.id),
            )
          }
        />
      ))}
      <ButtonRow />
    </>
  );
}

export default App;
