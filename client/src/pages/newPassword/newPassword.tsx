import AsideLeft from '../../components/asideLeft/AsideLeft';
import aside from '../../assets/newPassword.png';
import ResetPassword from '../../components/forgotPassword/Reset Password/ResetPassword';

const NewPassword = () => {
  const title: string = 'Your new password',
    description: string = 'Now you can change your password',
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
          <ResetPassword />
        </div>
      </div>
    </>
  );
};

export default NewPassword;
