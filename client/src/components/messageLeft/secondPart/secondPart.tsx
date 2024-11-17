import SearchBar from '../searchBar/searchBar';
import Discuss from '../discuss/discuss';
import './secondPart.css';
import { useEffect, useState } from 'react';
import { User, useApp } from '../../../providers/app.provider';
import { api } from '../../../api';
import { useParams } from 'react-router-dom';

export type Conversation = {
  sender: User;
  receiver: User;
  user?: User;
  lastMessage?: { content: string };
  id: string;
  messages?: any;
};

const SecondPart = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [search, setSearch] = useState<string>('');
  const { user } = useApp();
  const { id } = useParams();

  
  async function getConversations(search?: string) {
    const response = await api.get(
      `conversations${search ? '?search=' + search : ''}`,
    );
    const _conversations = response.data as Conversation[];
    
    setConversations(
      _conversations.map((c) => ({
        ...c,
        user: c.receiver.id !== user?.id ? c.receiver : c.sender,
      }))
    );
  }

  useEffect(() => {
    getConversations(search);
  }, [search, user]);

  return (
    <>
      <div className="second">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
        {conversations.map((c) => (
          <Discuss
            key={c.id}
            id={c.id ?? ''}
            road={c.user?.photo ?? ''}
            title={c.user?.username ?? ''}
            description={c.lastMessage ?? ''}
          />
        ))}
      </div>
    </>
  );
};

export default SecondPart;
