import "./MinSteps.css";

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export default function MinSteps({ value, onChange }: Props) {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    onChange(Math.max(1, value + delta));
  };

  return (
    <>
      <label htmlFor="minSteps">Min. Steps: </label>
      <input
        type="number"
        id="minSteps"
        className="min-steps-input"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        onWheel={handleWheel}
        min="1"
      />
    </>
  );
}
