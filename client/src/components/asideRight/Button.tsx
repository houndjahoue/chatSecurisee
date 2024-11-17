import { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
}

export default function Button({ text, loading, ...props }: ButtonProp) {
  return (
    <>
      <div className="BtnContainer editBtnContainer">
        <button
          type="submit"
          {...props}
          className="Btn editBtn">
          {loading ? <div className="spinner"></div> : text}
        </button>
      </div>
    </>
  );
}
