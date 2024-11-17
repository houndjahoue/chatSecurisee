import { useEffect, useId, useRef, useState } from 'react';
import './Message.css';
import { decryptMessageFromKey } from '../../utils';
import { useApp } from '../../providers/app.provider';

interface MessageProps {
  content: string;
  isSender: boolean;
  scrollToEnd: () => void;
}

function Message({ content, isSender, scrollToEnd }: MessageProps) {
  const [text, setText] = useState<string>('');
  const { user } = useApp();

  const decryptContent = async (content: string) => {
    const { sender, receiver } = JSON.parse(content);
    const message = await decryptMessageFromKey(
      user?.privateKey ?? '',
      isSender ? sender : receiver,
    );
    setText(message);
    scrollToEnd();
  };

  useEffect(() => {
    decryptContent(content);
  }, [content]);

  const uniqueKey: any = useId()

  const handleClick = ()=>{
    let edit: any = document.getElementById(`${uniqueKey}`) ,
        display = getComputedStyle(edit, null).display

    if(display == 'none'){
      edit.style.display = 'block'
    }
    else if(display == 'block'){
      edit.style.display = 'none'
    }
  }
  return (
    <>
      <div className={`message ${isSender ? 'sender' : 'receiver'}`} onClick={handleClick}>
        <p>{text}</p>
      </div>
      <div className={`${isSender ? 'sender' : 'receiver'} edit`} id={uniqueKey}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </>
  );
}

export default Message;
