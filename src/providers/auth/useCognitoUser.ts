import { Auth } from '@aws-amplify/auth';
import { useEffect, useState, useRef } from 'react';
import { Hub } from '@aws-amplify/core';

export interface CognitoUser {
  email: string;
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
function mapCognitoUser(user: any): CognitoUser | undefined {
  if (
    user?.attributes?.email &&
    user?.signInUserSession?.accessToken?.jwtToken &&
    user?.signInUserSession?.idToken?.jwtToken &&
    user?.signInUserSession?.refreshToken?.token
  ) {
    return {
      email: user.attributes.email,
      emailVerified: user.attributes.email_verified === 'True',
      accessToken: user.signInUserSession.accessToken,
      idToken: user.signInUserSession.idToken,
      refreshToken: user.signInUserSession.refreshToken,
    };
  }

  if (user) {
    // eslint-disable-next-line no-console
    console.log(
      'aws-amplify returned a CognitoUser. However, it has been skipped, because it lacks required attributes',
      user,
    );
  }

  return undefined;
}

export function useCognitoUser(): {
  user?: CognitoUser;
  loading: boolean;
} {
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

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    Hub.listen('auth', updateUser);

    updateUser();

    return () => {
      isMountedRef.current = false;

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      Hub.remove('auth', updateUser);
    };
  }, [isMountedRef]);

  return state;
}
