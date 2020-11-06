import { Auth, Hub } from 'aws-amplify';
import { useEffect, useState, useRef } from 'react';

export interface CognitoUser {
  email: string;
  emailVerified: boolean;
  accessToken: {
    jwtToken: string;
    payload: {
      auth_time: number;
      client_id: string;
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

/**
 * I'm not sure what can we expect in the response value of `Auth.currentAuthenticatedUser`,
 * as it's not typed, and there's loads of GH issues about it, that are unanswered by Amazon.
 *
 * So I just went into browser console, looked up what's in there at-the-moment,
 * and use that in the TS typedef here.
 *
 * This function makes sure that the required data is still there.
 * If it's not, we'll just treat the user as anonymous and log the payload to the console
 * to easen up debugging it.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCognitoUser(user: any): CognitoUser | undefined {
  if (
    user?.attributes?.email &&
    user?.signInUserSession?.accessToken?.jwtToken &&
    user?.signInUserSession?.accessToken?.payload?.['cognito:groups'] &&
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

/**
 * Gets the current CognitoUser,
 * by asking for it at the initial render,
 * and later on by listening to amplify `auth` events and asking for the current user again.
 *
 * (I wish I didn't have to write it,
 * but for now this is the best possible option to achieve it -
 * see https://github.com/aws-amplify/amplify-js/issues/3640 )
 *
 * **Important**: Don't use it directly,
 * as it's supposed to be called only once in your React tree.
 * Use `useAuthContext()` instead.
 */
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
          // eslint-disable-next-line no-console
          console.error('Auth.currentAuthenticatedUser raised an error:', error);
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
