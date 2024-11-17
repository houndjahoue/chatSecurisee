import './discuss.css';
import UserLogo from '../../../assets/User.jpg';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '../../../utils';

interface DiscussProp {
  road: string;
  title: string;
  description: any;
  id: string;
}

const Discuss = ({ road, title, description, id }: DiscussProp) => {
  const myclass = `discuss__image`;
  const navigate = useNavigate();

  const gotoConversation = () => {
    navigate(`/message/${id}`);
  };

  return (
    <>
      <div
        className="discuss__box otherDiscuss__box"
        onClick={gotoConversation}>
        <div className={myclass}>
          {road ? (
            <img
              src={road}
              alt="contactImg"
            />
          ) : (
            <img
              src={UserLogo}
              alt="contactImg"
            />
          )}
        </div>
        <div className="discuss__message">
          <p className="discuss__name">{capitalize(title)}</p>
          <p className="discuss__fewDescription">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Discuss;
