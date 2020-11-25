import { useContext } from 'react';
import { AuthContext, AuthContextValue } from '../providers/auth/AuthContext';

export const useGetIdentity = (): AuthContextValue => useContext(AuthContext);
