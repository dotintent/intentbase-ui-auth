import Amplify from 'aws-amplify';

export const configureAmplify = (): void => {
  Amplify.configure({
    Auth: {
      region: process.env.AWS_DEFAULT_REGION,
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.COGNITO_USER_POOL_CLIENT_ID,
    },
  });
};
