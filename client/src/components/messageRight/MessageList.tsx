import { useEffect, useRef } from 'react';
import Message from './Message.tsx';
import './MessageList.css';

interface MessageListProp {
  messages: MessagePropsSend[];
  currentUser: string;
}

interface MessagePropsSend {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
}

function MessageList({ messages, currentUser }: MessageListProp) {
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const scrollToEnd = () => {
    if (messageListRef.current) {
      const el = messageListRef.current;
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, []);

  return (
    <div
      ref={messageListRef}
      className="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          isSender={message.senderId === currentUser}
          scrollToEnd={scrollToEnd}
        />
      ))}
    </div>
  );
}

export default MessageList;
