import './asideLeft.css';
import { Link } from 'react-router-dom';

interface AsideLeftProps {
  title: string;
  description: string;
  description1: string;
  question: string;
  link: string;
  button: string;
  aside: string;
}

export default function AsideLeft({
  title,
  description,
  description1,
  question,
  link,
  button,
  aside,
}: AsideLeftProps) {
  return (
    <>
      <div className="container">
        <div className="description">
          <div className="welcome">{title}</div>
          <div className="welcomeDescription">
            {description}
            <span> {description1}</span>
          </div>
        </div>
        <div className="welcomeImage">
          <img
            src={aside}
            alt="let beginning"
          />
        </div>
        <div className="welcomeFooter">
          <p>{question}</p>
          <Link to={link}>
            <button type="button">{button}</button>
          </Link>
        </div>
      </div>
    </>
  );
}
