import { Auth } from '@aws-amplify/auth';

export interface UseConfirmSignupCodeProps {
  onSuccess?: (...values: any[]) => Promise<void>;
  successMsg?: string;
}

interface ConfirmCodeProps {
  username: string;
  code: string;
}

export const useConfirmSignupCode = ({ onSuccess, successMsg }: UseConfirmSignupCodeProps = {}): ((
  values: ConfirmCodeProps,
) => Promise<string | undefined>) => async ({ username, code }) => {
  return Auth.confirmSignUp(username.trim().toLowerCase(), code).then(async (response) => {
    onSuccess && (await onSuccess(response));
    return successMsg;
  });
};
