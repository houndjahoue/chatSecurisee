import React from 'react'
import AsideLeft from '../../components/asideLeft/AsideLeft'
import opi from '../../assets/OIP.png';
import A2fWriteCode from '../../components/forgotPassword/a2fWriteCode/a2fWriteCode';

const A2f = () => {

    const title: string = 'Authentification',
    description: string =
      'To improve your security, we have send you an authentification code.',
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
          aside={opi}
        />
        <A2fWriteCode />
      </div>
    </div>
  </>
  )
}

export default A2f
