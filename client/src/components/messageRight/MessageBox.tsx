import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { useState, useRef } from 'react';
import './MessageBox.css';
import { Conversation } from '../messageLeft/secondPart/secondPart';
import { useApp } from '../../providers/app.provider';
import { encryptMessageFromKey } from '../../utils';
import { api } from '../../api';

type Props = {
  conversation?: Conversation;
  id?: string;
  onSent: () => Promise<void>;
};

const MessageBox = ({ conversation, id = '', onSent }: Props) => {
  const { user } = useApp();
  const conversationId = conversation?.id;
  const [message, setMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async (e : any) => {

    e.preventDefault();

    if (message.trim() !== '') {
      const receiver =
        conversation?.receiver.id !== user?.id
          ? conversation?.receiver
          : conversation?.sender;

      const senderEncryptedMessage = await encryptMessageFromKey(
        user?.publicKey ?? '',
        message,
      );
      const receiverEncryptedMessage = await encryptMessageFromKey(
        receiver?.publicKey ?? '',
        message,
      );

      const response = await api.post('messages', {
        content: JSON.stringify({
          sender: senderEncryptedMessage,
          receiver: receiverEncryptedMessage,
        }),
        senderId: user?.id ?? '',
        receiverId: receiver?.id ?? '',
        conversationId: id,
      });
      
      const lastmessage = await api.post('users/update-lastmessage', {conversationId , message})
      
      setMessage('');
      onSent();

      

    }
  };

  const handleAttachClick = () => {
    const fileInputRefreceiver = fileInputRef.current;

    if (fileInputRefreceiver) fileInputRefreceiver?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
    }
  };

  return (
    <>
      <form className="message-box" onSubmit={handleSend}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div className="chat-container">
          <div className="paper-clip">
            <FaPaperclip
              className="attach-icon"
              size={24}
              onClick={handleAttachClick}
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez un message..."
          />

          <button
            className="send-button">
            <FaPaperPlane size={24} />
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageBox;
