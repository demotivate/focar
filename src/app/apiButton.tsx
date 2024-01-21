interface ButtonProps {
  onClick: () => void;
  label: string;
}

export default function ApiButton({onClick, label}: ButtonProps) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}
