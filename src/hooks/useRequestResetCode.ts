import { Auth } from '@aws-amplify/auth';

export interface UseSendResentPasswordProps {
  onSuccess?: (values: any) => Promise<void>;
  successMsg?: string;
}

export interface SendResetPasswordProps {
  username: string;
}

export const useRequestResetCode = ({ onSuccess, successMsg }: UseSendResentPasswordProps = {}): ((
  values: SendResetPasswordProps,
) => Promise<string | undefined>) => async ({ username }) => {
  return Auth.forgotPassword(username.trim().toLowerCase()).then(async () => {
    onSuccess && (await onSuccess({}));
    return successMsg;
  });
};
