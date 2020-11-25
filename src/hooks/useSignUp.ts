import { Auth } from '@aws-amplify/auth';

export interface UseSignUpProps {
  onSignUp?: (values: any) => Promise<void>;
  onSuccessSignUpMsg: string;
}
export interface SignUpRequires {
  email: string;
  password: string;
}

// Examples
// 1.) signUp({ email, password });
// 2.) signUp<ValuesInterface>({ email, password, age });

export const useSignUp = ({ onSignUp, onSuccessSignUpMsg }: UseSignUpProps) => {
  return async <T extends SignUpRequires>({
    email,
    password,
    ...rest
  }: T): Promise<string | undefined> => {
    const formattedEmail = email.trim().toLowerCase();
    return Auth.signUp({
      username: formattedEmail,
      password,
      attributes: {
        ...rest,
        email: formattedEmail,
      },
    }).then(async (user) => {
      onSignUp && (await onSignUp(user));
      return onSuccessSignUpMsg;
    });
  };
};
