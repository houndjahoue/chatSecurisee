/* import Label from '../../asideRight/Label';
import Input from '../../asideRight/Input';
import { useState } from 'react';
import './edit.css';
const Edit = () => {
  const [UserName, setUserName] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [UserProfession, setUserProfession] = useState<string>('');
  const [UserNationality, setUserNationality] = useState<string>('');
  const [Password, setPassword] = useState<string>('');


  return (
    <>
      <form className="edit__container">
        <h1>Edit Profile</h1>

        <form>
          <Label
            idValue="UserName"
            text="Nom d'utilisateur"
          />
          <Input
            type="text"
            id="UserName"
            placeholder="Nom d'utilisateur"
            value={UserName}
            onChange={(e) => {setUserName(e.target.value)}}
          />
          <div className="boutton">
            <button type="submit">save changes</button>
          </div>
        </form>

        <form>
          <Label
            idValue="Email"
            text="Adresse mail"
          />
          <Input
            type="text"
            id="Email"
            placeholder="example@gmail.com"
            value={Email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <div className="boutton">
            <button type="submit">save changes</button>
          </div>
        </form>

        <form>
          <Label
            idValue="Profession"
            text="Profession"
          />
          <Input
            type="text"
            id="Profession"
            placeholder="Profession"
            value={UserProfession}
            onChange={(e) => {setUserProfession(e.target.value)}}
          />
          <div className="boutton">
            <button type="submit">save changes</button>
          </div>
        </form>

        <form>
          <Label
            idValue="Nationality"
            text="Nationalité"
          />
          <Input
            type="text"
            id="Nationality"
            placeholder="Nationalité"
            value={UserNationality}
            onChange={(e) => {setUserNationality(e.target.value)}}
          />
          <div className="boutton">
            <button type="submit">save changes</button>
          </div>
        </form>
      </form>
    </>
  );
};

export default Edit;
 */
import { useState } from 'react';
import { api, setApiToken } from '../../../api';
import './edit.css';
import { useLocation } from 'react-router-dom';

const Edit = () => {
  const [UserName, setUserName] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [UserProfession, setUserProfession] = useState<string>('');
  const [UserNationality, setUserNationality] = useState<string>('');

  
  const location = useLocation();
  const userId = location.search.split('=')[1]

  const handleUpdate = async (endpoint: string, data: any) => {
    try {
      /* const response = await fetch(`http://localhost:5004/user/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }); */
      const response = await api.post(`/users/${endpoint}`, { data });
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent, endpoint: string, data: any) => {
    e.preventDefault();
    handleUpdate(endpoint, data);
  };

  return (
    <div className="edit__container">
      <h1>Edit Profile</h1>

      <form onSubmit={(e) => handleSubmit(e, 'update-username', { userId, username: UserName })}>
        <label htmlFor="UserName">Username</label>
        <input
          type="text"
          id="UserName"
          placeholder="Username"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">save changes</button>
      </form>

      <form onSubmit={(e) => handleSubmit(e, 'update-email', { userId, email: Email })}>
        <label htmlFor="Email">Email Address</label>
        <input
          type="email"
          id="Email"
          placeholder="example@gmail.com"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">save changes</button>
      </form>

      <form onSubmit={(e) => handleSubmit(e, 'update-profession', { userId, profession: UserProfession })}>
        <label htmlFor="Profession">Profession</label>
        <input
          type="text"
          id="Profession"
          placeholder="Profession"
          value={UserProfession}
          onChange={(e) => setUserProfession(e.target.value)}
        />
        <button type="submit">save changes</button>
      </form>

      <form onSubmit={(e) => handleSubmit(e, 'update-nationality', { nationality:UserNationality })}>
        <label htmlFor="Nationality">Nationality</label>
        <input
          type="text"
          id="Nationality"
          placeholder="Nationality"
          value={UserNationality}
          onChange={(e) => setUserNationality(e.target.value)}
        />
        <button type="submit">save changes</button>
      </form>
    </div>
  );
};

export default Edit;

/* import { useState } from 'react';
import { api } from '../../../api/index';

const EditProfile = () => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userProfession, setUserProfession] = useState<string>('');
  const [userNationality, setUserNationality] = useState<string>('');

  const handleUpdate = async (field: string, value: string) => {
    try {
      const response = await api.post(`/users/update-${field}`, { value });
      alert('Mise à jour réussie');
    } catch (error) {
      console.error('Erreur lors de la mise à jour', error);
      alert('Échec de la mise à jour');
    }
  };

  return (
    <div className="edit__container">
      <h1>Edit Profile</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleUpdate('username', userName); }}>
        <label htmlFor="UserName">Nom d'utilisateur</label>
        <input
          type="text"
          id="UserName"
          placeholder="Nom d'utilisateur"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Save changes</button>
      </form>

      <form onSubmit={(e) => { e.preventDefault(); handleUpdate('email', email); }}>
        <label htmlFor="Email">Adresse mail</label>
        <input
          type="email"
          id="Email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Save changes</button>
      </form>

      <form onSubmit={(e) => { e.preventDefault(); handleUpdate('profession', userProfession); }}>
        <label htmlFor="Profession">Profession</label>
        <input
          type="text"
          id="Profession"
          placeholder="Profession"
          value={userProfession}
          onChange={(e) => setUserProfession(e.target.value)}
        />
        <button type="submit">Save changes</button>
      </form>

      <form onSubmit={(e) => { e.preventDefault(); handleUpdate('nationality', userNationality); }}>
        <label htmlFor="Nationality">Nationalité</label>
        <input
          type="text"
          id="Nationality"
          placeholder="Nationalité"
          value={userNationality}
          onChange={(e) => setUserNationality(e.target.value)}
        />
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
 */