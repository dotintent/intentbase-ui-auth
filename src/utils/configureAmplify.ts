import Amplify from '@aws-amplify/auth';
import { OAuthOpts } from '@aws-amplify/auth/lib/types';

export const configureAmplify = (
  region: string,
  userPoolId: string,
  userPoolWebClientId: string,
  oauth?: OAuthOpts,
): void => {
  Amplify.configure({
    Auth: {
      region,
      userPoolId,
      userPoolWebClientId,
      ...(oauth && { oauth }),
    },
  });
};
