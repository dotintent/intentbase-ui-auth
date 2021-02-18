import { Auth } from '@aws-amplify/auth';

export interface UseLoginProps {
  onSuccess?: (values: any) => Promise<void>;
  successMsg?: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export const useLogin = ({ onSuccess, successMsg }: UseLoginProps = {}): ((
  values: LoginProps,
) => Promise<string | undefined>) => async ({ email, password }) =>
  Auth.signIn({
    username: email.trim().toLowerCase(),
    password,
  }).then(async (response) => {
    onSuccess && (await onSuccess(response));
    return successMsg;
  });
