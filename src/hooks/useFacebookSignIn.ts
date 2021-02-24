import { Auth } from '@aws-amplify/auth';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';

export interface UseFacebookSignInProps {
  onSuccess?: (values: any) => Promise<void>;
  successMsg?: string;
}

export const useFacebookSignIn = ({
  onSuccess,
  successMsg,
}: UseFacebookSignInProps = {}): (() => Promise<void>) => {
  return async () => {
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook }).then(
      async (response) => {
        onSuccess && (await onSuccess(response));
        return successMsg;
      },
    );
  };
};
