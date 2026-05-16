import verList from "../../data/version_dict.json";
import Select, { components } from "react-select";

type VersionKey = keyof typeof verList;

type Props = {
  value: VersionKey;
  onChange: (v: VersionKey) => void;
};

export default function VersionDropdown({ value, onChange }: Props) {
  return (
    <select
      id="version"
      value={value}
      onChange={(e) => onChange(e.target.value as VersionKey)}
    >
      {Object.keys(verList).map((version) => (
        <option key={version} value={version}>
          {version}
        </option>
      ))}
    </select>
  );
}
