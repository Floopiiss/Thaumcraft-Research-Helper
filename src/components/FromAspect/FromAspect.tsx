import translate from "../../data/translation_dict.json";
import { getAspectsForVersion } from "../../utils";
import Select, { components } from "react-select";

type VersionKey = keyof typeof import("../../data/version_dict.json");
type AspectKey = keyof typeof translate;

type Props = {
  version: VersionKey;
  value: AspectKey;
  onChange: (a: AspectKey) => void;
};

export default function FromAspect({ version, value, onChange }: Props) {
  const aspects = getAspectsForVersion(version) as AspectKey[];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as AspectKey)}
    >
      {aspects.map((aspect) => (
        <option key={aspect} value={aspect}>
          {(translate as Record<string, string>)[aspect] ?? aspect}
        </option>
      ))}
    </select>
  );
}
