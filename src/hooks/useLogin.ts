import { Auth } from '@aws-amplify/auth';

export interface UseLoginProps {
  onLogin?: (values: any) => Promise<void>;
  onSuccessLoginMsg?: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export const useLogin = (
  options?: UseLoginProps,
): ((values: LoginProps) => Promise<string | undefined>) => async ({ email, password }) =>
  Auth.signIn({
    username: email.trim().toLowerCase(),
    password,
  }).then(async (user) => {
    options?.onLogin && (await options.onLogin(user));
    return options?.onSuccessLoginMsg;
  });
