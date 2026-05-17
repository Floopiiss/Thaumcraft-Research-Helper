import verList from "../../data/version_dict.json";
import Select from "react-select";

type VersionKey = keyof typeof verList;

type Props = {
  value: VersionKey;
  onChange: (v: VersionKey) => void;
};

type Option = { value: VersionKey; label: string };

export default function VersionDropdown({ value, onChange }: Props) {
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
