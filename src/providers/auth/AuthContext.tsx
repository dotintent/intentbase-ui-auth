import { createContext, useContext } from 'react';

export interface AuthContextValue {
  loading: boolean;
  error?: any;
  user?: any;
}

export const AuthContext = createContext<AuthContextValue>({
  loading: true,
  user: undefined,
  error: undefined,
});

export const useAuthContext: () => AuthContextValue = () => useContext(AuthContext);
