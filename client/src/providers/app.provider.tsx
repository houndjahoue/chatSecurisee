import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

export type User = {
  id?: string;
  email?: string;
  gender?: string;
  photo: string;
  nationality?: string;
  profession?: string;
  username: string;
  publicKey?: string;
  privateKey?: string;
};

type AppContextArgs = {
  user?: User;
  setUser: Dispatch<User>;
};

const AppContext = createContext<AppContextArgs>({
  user: undefined,
  setUser: () => {},
});

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
