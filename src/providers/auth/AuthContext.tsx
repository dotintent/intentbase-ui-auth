import { createContext, useContext } from 'react';

export interface AuthContextValue {
  loading: boolean;
  user?: any;
}

export const AuthContext = createContext<AuthContextValue>({
  loading: true,
  user: undefined,
});

export const useAuthContext: () => AuthContextValue = () => useContext(AuthContext);
