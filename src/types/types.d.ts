import verList from "../data/version_dict.json";
import translate from "../data/translation_dict.json";

export type VersionKey = keyof typeof verList;

export type AspectKey = keyof typeof translate;

export type WindowState = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ConnectionWindowProps = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  connection: ConnectionResult;
  onMove: (next: { x: number; y: number }) => void;
  onResize: (next: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
  onClose?: () => void;
};

type Theme = "light" | "dark" | "catppuccin";
type Option = { value: VersionKey; label: string };

export type ConnectionResult = {
  path: AspectKey[];
  cost: number;
} | null;

export type SearchEntry = {
  aspect: AspectKey;
  path: AspectKey[];
  cost: number;
};