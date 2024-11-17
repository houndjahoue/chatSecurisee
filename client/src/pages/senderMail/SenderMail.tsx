import AsideLeft from '../../components/asideLeft/AsideLeft';
import aside from '../../assets/resetpage.png';
import Mail from '../../components/forgotPassword/mail/Mail';

const SenderMail = () => {
  const title: string = 'Reset Your password',
    description: string =
      "Don't Worry, follow proccess and you will be able to reset your password",
    description1: string = '',
    question: string = ' Go back to a sign up page',
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
          <Mail />
        </div>
      </div>
    </>
  );
};

export default SenderMail;
