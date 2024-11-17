import { FaUserCircle } from 'react-icons/fa';
import './Header.css';
import { capitalize } from '../../utils';

interface HeaderProps {
  name: string;
  profile: string;
  active: boolean;
}

export function Header({ name, profile, active }: HeaderProps) {
  const status1: string = 'En ligne';
  const status2: string = '';

  return (
    <div className="nav-top">
      <div className="user-image">
        {profile ? (
          <img
            src={profile}
            alt="Profil"
          />
        ) : (
          <FaUserCircle className="default-icon" />
        )}
      </div>
      <div className="user-info">
        <span className="user-name">{capitalize(name)}</span>
        <span className="user-status">{active ? status1 : status2}</span>
      </div>
    </div>
  );
}
