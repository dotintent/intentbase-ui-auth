import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext, AuthContextValue } from './AuthContext';
import { CognitoUser, useCognitoUser } from './useCognitoUser';
import { ApiContext } from './ApiProvider';

interface AuthContextProviderProps {
  getApiUser: (cognitoUser?: CognitoUser) => Promise<any>;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children, getApiUser }) => {
  const { user: cognitoUser, loading: cognitoUserLoading } = useCognitoUser();
  const [apiUser, setApiUser] = useState(undefined);
  const [apiUserLoading, setApiUserLoading] = useState(false);
  const [userError, setUserError] = useState(undefined);

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
      getApiUser(cognitoUser).then((result) => setApiUser(result));
    } catch (error) {
      setUserError(error);
      console.error('Error: ', error);
    }

    setApiUserLoading(false);
  }, [skipLoadingApiUser]);

  const contextValue = useMemo<AuthContextValue>(() => {
    return {
      loading: cognitoUserLoading || apiUserLoading || accessTokenWillBeSet,
      user: apiUser,
      userError,
    };
  }, [apiUser, apiUserLoading, cognitoUserLoading, accessTokenWillBeSet]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
