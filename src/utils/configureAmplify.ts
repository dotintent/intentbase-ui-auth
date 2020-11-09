import Amplify from 'aws-amplify';

export const configureAmplify = (
  region: string,
  userPoolId: string,
  userPoolWebClientId: string,
): void => {
  Amplify.configure({
    Auth: {
      region,
      userPoolId,
      userPoolWebClientId,
    },
  });
};
