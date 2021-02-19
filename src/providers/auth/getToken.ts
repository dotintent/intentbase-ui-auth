import { Auth } from '@aws-amplify/auth';

export const getToken = async () => {
  const session = await Auth.currentSession();
  const JwtToken = session.getIdToken().getJwtToken();
  return JwtToken;
};
