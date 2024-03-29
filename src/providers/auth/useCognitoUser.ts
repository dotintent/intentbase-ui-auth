import { Auth } from '@aws-amplify/auth';
import { useEffect, useState, useRef } from 'react';
import { Hub } from '@aws-amplify/core';

export interface CognitoUser {
  username: string;
  emailVerified: boolean;
  accessToken: {
    jwtToken: string;
    payload: {
      auth_time: number;
      client_id: string;
      'cognito:groups': any;
      event_id: string;
      exp: number;
      iat: number;
      iss: string;
      jti: string;
      scope: string;
      sub: string;
      token_use: string;
      username: string;
    };
  };
  idToken: {
    jwtToken: string;
  };
  refreshToken: {
    token: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapCognitoUser = (user: any): CognitoUser | undefined => {
  if (
    (user?.attributes?.email || user?.username) &&
    user?.signInUserSession?.accessToken?.jwtToken &&
    user?.signInUserSession?.idToken?.jwtToken &&
    user?.signInUserSession?.refreshToken?.token
  ) {
    return {
      username: user?.attributes?.email || user.username,
      emailVerified: user?.attributes?.email_verified === 'True',
      accessToken: user.signInUserSession.accessToken,
      idToken: user.signInUserSession.idToken,
      refreshToken: user.signInUserSession.refreshToken,
    };
  }

  if (user) {
    console.warn(
      'aws-amplify returned a CognitoUser. However, it has been skipped, because it lacks required attributes',
      user,
    );
  }

  return undefined;
};

export const useCognitoUser = (): {
  user?: CognitoUser;
  loading: boolean;
} => {
  const [state, setState] = useState<{ user?: CognitoUser; loading: boolean }>({
    loading: true,
  });
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const updateUser = async () => {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        if (isMountedRef.current) {
          setState({ user: mapCognitoUser(cognitoUser), loading: false });
        }
      } catch (error) {
        if (isMountedRef.current) {
          setState({ user: undefined, loading: false });
        }
      }
    };

    Hub.listen('auth', ({ payload: { event } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          updateUser();
          break;
        default:
          break;
      }
    });

    updateUser();

    return () => {
      isMountedRef.current = false;
      Hub.remove('auth', ({ payload: { event } }) => {
        switch (event) {
          case 'signIn':
          case 'cognitoHostedUI':
            updateUser();
            break;
          default:
            break;
        }
      });
    };
  }, [isMountedRef]);

  return state;
};
