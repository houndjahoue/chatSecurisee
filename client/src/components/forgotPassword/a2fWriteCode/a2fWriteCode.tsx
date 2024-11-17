import Label from '../../asideRight/Label';
import Input from '../../asideRight/Input';
import Button from '../../asideRight/Button';
import { useState } from 'react';
import { api } from '../../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { Error } from '../../error/error';

const A2fWriteCode = () => {
  const [code, setCode] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    setLoading(true);
    try {
      const userId = location.search.split('=')[1];
      const response = await api.post('users/verify-otp2', {
        value: code,
        userId,
      });

      console.log(response)
      navigate(`/message?uid=${userId}`);
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
      <div className="writeCode__container">
        <h1 className="writeCode__title">Access Code</h1>

        <Error errors={errors} />

        <div className="writeCode__content">
          <div className="writeCode__field">
            <Label
              idValue="writecode"
              text="Code"
            />
            <Input
              type="text"
              id="writecode"
              placeholder=""
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <Button
            onClick={handleClick}
            loading={loading}
            disabled={loading}
            text="validate"
          />
        </div>
      </div>
    </>
  );
};

export default A2fWriteCode;
