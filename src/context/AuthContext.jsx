import { createContext, useContext, useMemo, useState } from 'react';
import {
  clearStoredUser,
  getStoredUser,
  loginUser,
  storeUser,
} from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  async function login(credentials) {
    const loggedUser = await loginUser(credentials);
    storeUser(loggedUser);
    setUser(loggedUser);
  }

  function logout() {
    clearStoredUser();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      login,
      logout,
      user,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
