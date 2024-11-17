import UserLogo from '../../../assets/User.jpg';
import logout from '../../../assets/logout.svg';
import setting from '../../../assets/setting.svg';
import { Link, useLocation } from 'react-router-dom';
import './firstPart.css';
import { useEffect, useState } from 'react';
import { User, useApp } from '../../../providers/app.provider';
import { api } from '../../../api';
import { capitalize } from '../../../utils';


const FirstPart = () => {
  const link: string = '/setting';


  const User = useApp()
  const token = sessionStorage.getItem("__auth_token__")
  let userId = ''
  
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const { setUser: setAppUser } = useApp();
  const [myId, setMyId] = useState('')

  
  
  
  useEffect(()=> {
     setMyId(location.search.split('=')[1])
  }, [])

  const login: string = `/?uid=${myId}`;

  async function getCurrentUser() {
    const response = await api.get('users/me');
    setUser(response.data as User);
    setAppUser(response.data as User);
  }

  async function handleClick() {
    const response = await api.post('users/logout');
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <div className="firstPart__aside">
        <div className="firstPart__imageUser">
          {user?.photo ? (
            <img
              src={user?.photo}
              alt="User"
            />
          ) : (
            <img
              src={UserLogo}
              alt="User"
            />
          )}
          <div>{capitalize(user?.username ?? '')}</div>
        </div>
        <div className="firstPart__bottom_wrapper">
          <Link to={`/setting?uid=${userId}`} >
            <div className="firstPart__imageSetting">
              <img
                src={setting}
                alt="User"
              />
              <div>Setting</div>
            </div>
          </Link>
          <Link to={login} onClick={handleClick}>
            <div className="firstPart__imageLogOut" >
              <img
                src={logout}
                alt="User"
              />
              <div>Log out</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FirstPart;
