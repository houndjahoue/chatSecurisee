import SignUp from './pages/signUp/signUp';
import SignIn from './pages/signIn/signIn';
import Message from './pages/message/message';
import Setting from './pages/setting/setting';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SenderMail from './pages/senderMail/SenderMail';
import Token from './pages/token/Token';
import NewPassword from './pages/newPassword/newPassword';
import PolitiquePage from './pages/politiquePage/PolitiquePage';
import { AppProvider } from './providers/app.provider';
import { MessageInfo } from './pages/message/messageRight/message-info';
import { DirectMessage } from './pages/message/messageRight/direct-message';
import A2f from './pages/A2F/a2f';

function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<SignIn />}
            />
            <Route
              path="/signIn"
              element={<SignIn />}
            />
            <Route
              path="/signUp"
              element={<SignUp />}
            />
            <Route
              path="/message"
              element={<Message />}>
              <Route
                index
                element={<MessageInfo />}
              />
              <Route
                path=":id"
                element={<DirectMessage />}
              />
            </Route>
            <Route
              path="/setting"
              element={<Setting />}
            />
            <Route
              path="/forgetPassword"
              element={<SenderMail />}
            />
            <Route
              path="/token"
              element={<Token />}
            />
            <Route
              path="/newPassword"
              element={<NewPassword />}
            />
            <Route
              path="/politiquePage"
              element={<PolitiquePage />}
            />
            <Route
              path="/a2f"
              element={<A2f />}
            />
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
