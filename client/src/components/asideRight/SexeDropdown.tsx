import { ChangeEvent, SelectHTMLAttributes } from 'react';
import './SexeDropdown.css';

export default function SexeDropdown(
  props: SelectHTMLAttributes<HTMLSelectElement>,
) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (props.onChange) {
      return props.onChange(e);
    }
  };

  return (
    <div>
      <select
        id="gender"
        name="sexe"
        className="sexeDropdown"
        onChange={handleChange}>
        <option value="FEMALE">Féminin</option>
        <option value="MALE">Masculin </option>
      </select>
    </div>
  );
}
