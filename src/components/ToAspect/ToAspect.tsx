import translate from "../../data/translation_dict.json";
import { getAspectsForVersion } from "../../utils";
import Select from "react-select";

type VersionKey = keyof typeof import("../../data/version_dict.json");
type AspectKey = keyof typeof translate;

type Props = {
  version: VersionKey;
  value: AspectKey;
  onChange: (a: AspectKey) => void;
};

export default function ToAspect({ version, value, onChange }: Props) {
  const aspects = getAspectsForVersion(version) as AspectKey[];

  const options = aspects.map((aspect) => {
    const translated = (translate as Record<string, string>)[aspect] ?? aspect;
    return {
      value: aspect,
      label: translated,
      image: new URL(`../../assets/colour/${translated}.png`, import.meta.url)
        .href,
    };
  });

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <>
      <label htmlFor="ToAspect">To:</label>
      <Select
        id="ToAspect"
        options={options}
        value={selectedOption}
        onChange={(selected) => {
          if (selected) {
            onChange(selected.value);
          }
        }}
        isSearchable
        isClearable={false}
        formatOptionLabel={(option) => (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={option.image}
              alt={option.label}
              style={{ width: "20px", height: "20px" }}
            />
            <span>{option.label}</span>
          </div>
        )}
      />
    </>
  );
}
