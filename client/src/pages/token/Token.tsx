import AsideLeft from '../../components/asideLeft/AsideLeft';
import aside from '../../assets/find.png';
import WriteCode from '../../components/forgotPassword/writeCode/WriteCode';

const Token = () => {
  const title: string = 'Authenfication Code',
    description: string =
      'We have send you an authentification code, check your email and write it before 5 next minute',
    description1: string = '',
    question: string = 'Go to login page',
    button: string = 'Connexion',
    link: string = '/signIn';

  return (
    <>
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
          <WriteCode />
        </div>
      </div>
    </>
  );
};

export default Token;
