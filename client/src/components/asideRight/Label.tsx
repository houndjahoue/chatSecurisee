export interface LabelProps {
  idValue: string;
  text: string;
}

export default function Label(props: LabelProps) {
  return (
    <label
      htmlFor={props.idValue}
      className="SignUpLabel">
      {props.text}
    </label>
  );
}
