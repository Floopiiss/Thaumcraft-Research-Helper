import "./FindConnectionBtn.css";

type Props = { onClick?: () => void };

export default function FindConnectionBtn({ onClick }: Props) {
  return (
    <>
      <button id="FindConnectionBtn" name="FindConnection" onClick={onClick}>
        Find Connection
      </button>
    </>
  );
}
