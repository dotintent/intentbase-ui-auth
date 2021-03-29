import { Auth } from '@aws-amplify/auth';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';

export interface UseGoogleSignInProps {
  onSuccess?: (values: any) => Promise<void>;
  successMsg?: string;
}

export const useGoogleSignIn = ({
  onSuccess,
  successMsg,
}: UseGoogleSignInProps = {}): (() => Promise<void>) => {
  return async () => {
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google }).then(
      async (response) => {
        onSuccess && (await onSuccess(response));
        return successMsg;
      },
    );
  };
};
