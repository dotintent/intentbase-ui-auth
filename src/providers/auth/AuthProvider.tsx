import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext, AuthContextValue } from './AuthContext';
import { useCognitoUser } from './useCognitoUser';

export interface ApiContextValue {
  accessToken?: string;

  setAccessToken(nextAccessToken: string | undefined): void;
}

export const ApiContext = createContext<ApiContextValue>({
  setAccessToken() {},
});

export const ApiProvider: FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();

  const contextValue = useMemo(() => {
    return {
      accessToken,
      setAccessToken,
    };
  }, [accessToken]);

  return <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>;
};

interface AuthContextProviderProps {
  getApiUser: Promise<(id?: number) => any>;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children, getApiUser }) => {
  const { user: cognitoUser, loading: cognitoUserLoading } = useCognitoUser();
  const [apiUser, setApiUser] = useState(undefined);
  const [apiUserLoading, setApiUserLoading] = useState(false);

  const jwtAccessToken = cognitoUser?.idToken.jwtToken;
  const apiContext = useContext(ApiContext);
  useEffect(() => {
    if (apiContext.accessToken !== jwtAccessToken) {
      apiContext.setAccessToken(jwtAccessToken);
    }
  }, [apiContext, jwtAccessToken]);

  const isAccessTokenAlreadySet = apiContext.accessToken === jwtAccessToken;
  const accessTokenWillBeSet = !!(jwtAccessToken && !isAccessTokenAlreadySet);

  const skipLoadingApiUser = cognitoUserLoading || !cognitoUser || !isAccessTokenAlreadySet;

  useEffect(() => {
    setApiUserLoading(true);
    if (skipLoadingApiUser) {
      setApiUser(undefined);
    }

    try {
      getApiUser.then((result) => setApiUser(result));
    } catch (e) {
      console.error('Error: ', e);
    }

    setApiUserLoading(false);
  }, [skipLoadingApiUser]);

  const contextValue = useMemo<AuthContextValue>(() => {
    return {
      loading: cognitoUserLoading || apiUserLoading || accessTokenWillBeSet,
      user: apiUser,
    };
  }, [apiUser, apiUserLoading, cognitoUserLoading, accessTokenWillBeSet]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
