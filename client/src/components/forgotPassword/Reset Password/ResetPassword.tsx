import { useMemo, useState } from 'react';
import Label from '../../asideRight/Label';
import Input from '../../asideRight/Input';
import Button from '../../asideRight/Button';
import './resetPassword.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { Error } from '../../error/error';

const ResetPassword = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const passwordHint = useMemo(() => {
    if (confirmPassword && confirmPassword !== password) {
      return 'Les mots de passe ne correspondent pas';
    }
  }, [confirmPassword, password]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const userId = location.search.split('=')[1];
      await api.post('users/update-password', { password, userId });
      alert('Mot de passe changé avec succès');
      navigate('/');
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
      <div className="resetPassword__container">
        <h1 className="resetPassword__title">New Password</h1>

        <Error errors={errors} />
        <div className="resetPassword__content">
          <div className="resetPassword__field">
            <Label
              idValue="newpassword"
              text="New Password"
            />
            <Input
              type="password"
              id="newpassword"
              placeholder="Write stronger password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label
              idValue="confirmPassword"
              text="Confirm password"
            />
            <Input
              type="password"
              id="confirmPassword"
              placeholder="confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="password-hint">{passwordHint}</span>
          </div>
          <Button
            onClick={handleClick}
            loading={loading}
            disabled={loading}
            text="Confirm"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
