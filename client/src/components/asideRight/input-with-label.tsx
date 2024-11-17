import { InputHTMLAttributes } from 'react';
import Input from './Input';
import Label, { LabelProps } from './Label';

export const InputWithLabel = ({
  idValue,
  text,
  ...props
}: LabelProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      <Label
        idValue={idValue}
        text={text}
      />
      <Input
        id={idValue}
        {...props}
      />
    </div>
  );
};
