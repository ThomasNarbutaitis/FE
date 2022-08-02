import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: '',
  userId: '',
});

AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem('login-token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  function login(gotToken, gotUserId) {
    setToken(gotToken);
    setUserId(gotUserId);
    localStorage.setItem('login-token', gotToken);
    localStorage.setItem('userId', gotUserId);
  }

  const history = useHistory();

  function logout() {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('login-token');
    localStorage.removeItem('userId');
    history.replace('/');
  }

  const ctx = {
    login,
    logout,
    isUserLoggedIn: !!token,
    token,
    userId,
  };

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}
