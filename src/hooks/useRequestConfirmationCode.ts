import { Auth } from '@aws-amplify/auth';

export const useRequestConfirmationCode = () => async (email: string) => Auth.resendSignUp(email);
