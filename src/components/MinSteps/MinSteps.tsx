type Props = {
  value: number;
  onChange: (v: number) => void;
};

export default function MinSteps({ value, onChange }: Props) {
  return (
    <>
      <label htmlFor="minSteps">Min. Steps: </label>
      <input
        type="number"
        name="minSteps"
        id="minSteps"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </>
  );
}
