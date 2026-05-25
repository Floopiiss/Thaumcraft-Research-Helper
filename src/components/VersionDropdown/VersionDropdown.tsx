import verList from "../../data/version_dict.json";
import Select from "react-select";
import type { VersionKey, Option } from "../../types/types";

type Props = {
  value: VersionKey;
  onChange: (v: VersionKey) => void;
};

export default function VersionDropdown({ value, onChange }: Props) {
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

  const options: Option[] = Object.keys(verList).map((v) => ({
    value: v as VersionKey,
    label: v,
  }));

  const selected = options.find((o) => o.value === value) ?? null;

  return (
    <>
      <label htmlFor="verDropdown">Version Dropdown: </label>
      <Select<Option, false>
        id="verDropdown"
        styles={customStyles}
        options={options}
        value={selected}
        onChange={(opt) => {
          if (opt) onChange(opt.value);
        }}
        isClearable={false}
        isSearchable
      />
    </>
  );
}
