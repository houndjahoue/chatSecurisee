import Button from './Button';
import { ChangeEvent, useState } from 'react';
import './asideRightIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { InputWithLabel } from './input-with-label';
import { api, setApiToken } from '../../api';

type UserConnexion = {
  email: string;
  password: string;
};

const blankField: UserConnexion = {
  email: '',
  password: '',
};

const AsideRightIn = () => {
  const [userConnexion, setUserConnexion] = useState<UserConnexion>(blankField);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setUserConnexion({ ...userConnexion, [id]: value });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const email = userConnexion.email
      const response = await api.post('/users/signin', userConnexion);
      setApiToken(response.data.authToken);
      const response2 = await api.post(`users/forgot-password2`, { email });

      navigate(`/a2f?uid=${response.data.user.id}`);
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

    setUserConnexion(blankField);
  }

  return (
    <>
      <div className="asideRight">
        <h1 className="centering color">SignIn</h1>

        {errors.length > 0 && (
          <div className="signUp__form__error ">
            {errors.map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </div>
        )}

        <form
          className="asideRightContainer"
          onSubmit={handleSubmit}>
          <InputWithLabel
            idValue="email"
            text="Email address"
            type="text"
            id="email"
            placeholder="example@gmail.com"
            value={userConnexion.email}
            onChange={handleChange}
          />

          <InputWithLabel
            idValue="password"
            text="Password"
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={userConnexion.password}
            onChange={handleChange}
          />

          <div className="forgottenPassword">
            <Link to="/forgetPassword">Forgot password ?</Link>
          </div>

          <Button
            text="Connexion"
            disabled={loading}
            loading={loading}
          />
        </form>
      </div>
    </>
  );
};

export default AsideRightIn;

/* import Button from './Button';
import { ChangeEvent, useState } from 'react';
import './asideRightIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { InputWithLabel } from './input-with-label';
import { api, setApiToken } from '../../api';

type UserConnexion = {
  email: string;
  password: string;
};

const blankField: UserConnexion = {
  email: '',
  password: '',
};

const AsideRightIn = () => {
  const [userConnexion, setUserConnexion] = useState<UserConnexion>(blankField);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<UserConnexion | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setUserConnexion({ ...userConnexion, [id]: value });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const email = userConnexion.email;
      const response = await api.post('/users/signin', userConnexion);
      setApiToken(response.data.authToken);
      const response2 = await api.post('users/forgot-password2', { email });

      navigate('/a2f');
    } catch (error: any) {
      const messages = error.response.data.message as string[] | string;
      setErrors(Array.isArray(messages) ? messages : [messages]);
      setTimeout(() => {
        setErrors([]);
      }, 10000);
    } finally {
      setLoading(false);
      setSubmittedData(userConnexion);  // Enregistrer les données soumises
    }

    setUserConnexion(blankField);
  }

  return (
    <>
      <div className="asideRight">
        <h1 className="centering color">Se connecter</h1>

        {errors.length > 0 && (
          <div className="signUp__form__error">
            {errors.map((err, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: err }} />
            ))}
          </div>
        )}

      <div className="injectedContent">
        <p dangerouslySetInnerHTML={{ __html: userConnexion.email }}></p>
        <p dangerouslySetInnerHTML={{ __html: userConnexion.password }}></p>
      </div>


        <form className="asideRightContainer" onSubmit={handleSubmit}>
          <InputWithLabel
            idValue="email"
            text="Adresse mail"
            type="text"
            id="email"
            placeholder="example@gmail.com"
            value={userConnexion.email}
            onChange={handleChange}
          />
          <InputWithLabel
            idValue="password"
            text="Mot de passe"
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={userConnexion.password}
            onChange={handleChange}
          />
          <div className="forgottenPassword">
            <Link to="/forgetPassword">Mot de passe oublié ?</Link>
          </div>
          <Button text="Connexion" disabled={loading} loading={loading} />
        </form>*/

        {/* Section pour démontrer l'injection XSS */}
        /* {submittedData && (
          <div className="injectedContent">
            <p dangerouslySetInnerHTML={{ __html: submittedData.email }}></p>
            <p dangerouslySetInnerHTML={{ __html: submittedData.password }}></p>
          </div>
        )}
      </div>
    </>
  );
};

export default AsideRightIn;  */