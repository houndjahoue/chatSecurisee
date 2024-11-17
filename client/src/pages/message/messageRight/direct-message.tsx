import { useEffect, useState } from 'react';
import { Header } from '../../../components/messageRight/Header';
import MessageBox from '../../../components/messageRight/MessageBox';
import MessageList from '../../../components/messageRight/MessageList';
import { Conversation } from '../../../components/messageLeft/secondPart/secondPart';
import { useParams } from 'react-router-dom';
import { api } from '../../../api';
import { useApp } from '../../../providers/app.provider';
import { addPushEventListener } from '@asaje/sse-push-event-client';

export function DirectMessage() {
  const [conversation, setConversation] = useState<Conversation>();
  const { id } = useParams();
  const { user } = useApp();

  async function getConversation() {
    const response = await api.get(`conversations/${id}`);
    setConversation(response.data);
  }

  useEffect(() => {
    getConversation();
    addPushEventListener('new-message', () => {
      getConversation();
    });
    
  },[id]);

  return (
    <>
      <div className="direct-message">
        <Header
          name={
            user?.id == conversation?.receiver.id ?
            conversation?.sender.username || '' :
            conversation?.receiver.username ?? ''}
          profile={
            user?.id == conversation?.receiver.id ?
            conversation?.sender.photo || '' :
            conversation?.receiver.photo ?? ''}
          active={user?.id == conversation?.receiver.id ?
            conversation?.sender.state || false :
            conversation?.receiver.state ?? false }
        />
        <MessageList
          messages={conversation?.messages ?? []}
          currentUser={user?.id ?? ''}
        />
        <MessageBox
          id={id}
          conversation={conversation}
          onSent={getConversation}
        />
      </div>
    </>
  );
}
