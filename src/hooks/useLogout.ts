import { Auth } from '@aws-amplify/auth';

export interface SignOutOpts {
  global?: boolean;
}

interface UseLogoutProps {
  onLogout?: () => void;
  singOutOptions?: SignOutOpts;
}

export const useLogout = (options?: UseLogoutProps): (() => Promise<void>) => {
  return async () => {
    await Auth.signOut(options?.singOutOptions);
    options?.onLogout && options.onLogout();
  };
};
