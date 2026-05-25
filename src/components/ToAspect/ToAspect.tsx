import translate from "../../data/translation_dict.json";
import { getAspectsForVersion } from "../../utils";
import Select from "react-select";
import type { VersionKey, AspectKey } from "../../types/types";

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

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: "var(--surface)",
      borderColor: state.isFocused ? "var(--primary)" : "var(--border)",
      boxShadow: state.isFocused ? "0 0 0 1px var(--primary)" : "none",
      "&:hover": {
        borderColor: "var(--primary-hover)",
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "var(--text)",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "var(--surface)",
      border: "1px solid var(--border)",
      overflow: "hidden",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "var(--primary)"
        : state.isFocused
          ? "var(--surface-2)"
          : "transparent",
      color: state.isSelected ? "var(--primary-contrast)" : "var(--text)",
      cursor: "pointer",
    }),
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <>
      <label htmlFor="ToAspect">To:</label>
      <Select
        id="ToAspect"
        styles={customStyles}
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
