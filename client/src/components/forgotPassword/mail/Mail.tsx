import './mail.css';
import Label from '../../asideRight/Label';
import Input from '../../asideRight/Input';
import Button from '../../asideRight/Button';
import { useState } from 'react';
import { api } from '../../../api';
import { useNavigate } from 'react-router-dom';

const Mail = () => {
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await api.post('users/forgot-password', { email });
      navigate(`/token?uid=${response.data.userId}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const messages = error.response.data.message as string[] | string;
      setErrors(Array.isArray(messages) ? messages : [messages]);
      setTimeout(() => {
        setErrors([]);
      }, 10000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mail__container">
        <h1 className="mail__title">Choose Your Mail</h1>
        {errors.length > 0 && (
          <div className="signUp__form__error ">
            {errors.map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </div>
        )}
        <div className="mail__content">
          <div className="mail__field">
            <Label
              idValue="sendMail"
              text="Adresse mail"
            />
            <Input
              type="text"
              id="sendMail"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            onClick={handleClick}
            disabled={loading}
            loading={loading}
            text="Check"
          />
        </div>
      </div>
    </>
  );
};

export default Mail;
