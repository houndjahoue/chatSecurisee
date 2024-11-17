import { InputHTMLAttributes } from 'react';
import './Input.css';

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="InputBox">
      <input {...props} />
    </div>
  );
}
