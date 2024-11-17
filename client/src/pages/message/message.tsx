import MessageRight from './messageRight/messageRight';
import MessageLeft from './messageLeft/messageLeft';
import { useState } from 'react';

const message = () => {

  const [load, setLoad] = useState<any>()

  return (
    <>
      <div className="main">
        <div className="aside-message">
          <MessageLeft />
          <MessageRight/>
        </div>
      </div>
    </>
  );
};

export default message;