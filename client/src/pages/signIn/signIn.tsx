import AsideLeft from '../../components/asideLeft/AsideLeft.tsx';
import AsideRightIn from '../../components/asideRight/asideRightIn.tsx';
import aside from '../../assets/aside.png';

const SignIn = () => {
  const title: string = 'Welcome back',
    description: string = 'Discute with your friend and ',
    description1: string = 'your communauty',
    question: string = ' you have not account ?',
    button: string = 'Create',
    link: string = '/signUp';

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
          <AsideRightIn />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
