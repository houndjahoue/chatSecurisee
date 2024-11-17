import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import Label from './Label.tsx';
import Button from './Button.tsx';
import SexeDropdown from './SexeDropdown.tsx';

import { FaCircleUser } from 'react-icons/fa6';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import './asideRightUp.css';
import { InputWithLabel } from './input-with-label.tsx';
import { api } from '../../api/index.ts';
import { useNavigate } from 'react-router-dom';

type UserForm = {
  username: string;
  profession: string;
  nationality: string;
  email: string;
  password: string;
  photo: string;
  gender: string;
};

const blankField: UserForm = {
  username: '',
  profession: '',
  nationality: '',
  email: '',
  password: '',
  photo: '',
  gender: 'FEMALE',
};

const AsideRightUp = () => {
  const [userForm, setUserForm] = useState<UserForm>(blankField);
  const [preview, setPreview] = useState('');
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordHint = useMemo(() => {
    if (confirmPassword && confirmPassword !== userForm.password) {
      return 'Les mots de passe ne correspondent pas';
    }
  }, [confirmPassword, userForm.password]);

  const formValid = useMemo(() => {
    return (
      userForm.email &&
      userForm.gender &&
      userForm.password &&
      userForm.username &&
      !passwordHint &&
      confirmPassword
    );
  }, [userForm, passwordHint, confirmPassword]);

  const pickImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement>,
  ) => {
    const { value, id } = e.target;
    setUserForm({ ...userForm, [id]: value });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64value = reader.result as string;
        setPreview(base64value);
        setUserForm({ ...userForm, photo: base64value });
      };

      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post('users/signup', userForm);
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
  }

  return (
    <>
      <div className="container1">
        <h1 className="centering color">SignUp</h1>
        <div className="centering">
          <span
            onClick={pickImage}
            className="asideImage">
            {preview ? (
              <img
                src={preview}
                alt="Photo de profil"
                className="UserImage"
              />
            ) : (
              <span>
                <FaCircleUser className="icon color" />
                <MdOutlinePhotoCamera className="camera" />
              </span>
            )}
          </span>
          <input
            type="file"
            ref={imageRef}
            onChange={handleFileChange}
          />
        </div>
        {!preview && (
          <div className="centering">
            <h4>Choose picture</h4>
          </div>
        )}

        {errors.length > 0 && (
          <div className="signUp__form__error ">
            {errors.map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="signUp__form">
            <InputWithLabel
              idValue="username"
              text="Username (*)"
              placeholder="Nom d'utilisateur"
              value={userForm.username}
              onChange={handleChange}
              type="text"
            />
            <div>
              <Label
                idValue="gender"
                text="Sex (*)"
              />
              <SexeDropdown onChange={handleChange} />
            </div>

            <InputWithLabel
              idValue="profession"
              text="Profession"
              type="text"
              id="profession"
              placeholder="Profession"
              value={userForm.profession}
              onChange={handleChange}
            />

            <InputWithLabel
              idValue="nationality"
              text="Nationality"
              type="text"
              id="nationality"
              placeholder="Nationalité"
              value={userForm.nationality}
              onChange={handleChange}
            />

            <InputWithLabel
              idValue="email"
              text="Email address (*)"
              type="text"
              id="email"
              placeholder="example@gmail.com"
              value={userForm.email}
              onChange={handleChange}
            />

            <InputWithLabel
              idValue="password"
              text="Password"
              type="password"
              id="password"
              placeholder="Mot de passe (*)"
              value={userForm.password}
              onChange={handleChange}
            />

            <div>
              <InputWithLabel
                idValue="confirmpassword"
                text="Confirm Password"
                type="password"
                id="confirmpassword"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="password-hint">{passwordHint}</span>
            </div>
          </div>
          <Button
            text="Create"
            disabled={!formValid || loading}
            loading={loading}
          />
        </form>
      </div>
    </>
  );
};

export default AsideRightUp;
