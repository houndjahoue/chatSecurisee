type Props = {
  errors: string[];
};

export const Error = ({ errors }: Props) => {
  if (errors.length > 0) {
    return (
      <div className="signUp__form__error ">
        {errors.map((err, index) => (
          <div key={index}>{err}</div>
        ))}
      </div>
    );
  }

  return null;
};
