import { Auth } from '@aws-amplify/auth';

export interface SetNewPasswordProps {
  onSuccess?: (values: any) => Promise<void>;
  successMsg?: string;
}

export interface NewPasswordProps {
  username: string;
  code: string;
  password: string;
}

export const useSetNewPassword = ({ onSuccess, successMsg }: SetNewPasswordProps = {}): ((
  values: NewPasswordProps,
) => Promise<string | undefined>) => async ({ username, code, password }) => {
  return Auth.forgotPasswordSubmit(username.trim().toLowerCase(), code, password).then(
    async (response) => {
      onSuccess && (await onSuccess(response));
      return successMsg;
    },
  );
};
