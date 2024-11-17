import AsideLeft from '../../components/asideLeft/AsideLeft';
import AsideRightUp from '../../components/asideRight/asideRightUp';
import aside from '../../assets/aside.png';

export default function SignUp() {
  const title: string = 'Welcome',
    description: string = 'Discover our community and let start',
    description1: string = 'this beautiful world',
    question: string = ' Have you already a count ?',
    button: string = 'Connexion',
    link: string = '/signIn';

  return (
    <div>
      <div className="main">
        <div className="aside">
          <AsideLeft
            title={title}
            description={description}
            description1={description1}
            question={question}
            button={button}
            link={link}
            aside={aside}
          />
          <AsideRightUp />
        </div>
      </div>
    </div>
  );
}
