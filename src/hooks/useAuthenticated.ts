import { Auth } from '@aws-amplify/auth';

interface UseAuthenticatedProps {
  onReject?: () => Promise<void>;
  onSuccess?: (session: any) => Promise<void>;
}

// TODO: Handle authGroups
export const useAuthenticated = async (options?: UseAuthenticatedProps): Promise<void> => {
  const session = await Auth.currentSession();
  if (!session) {
    options?.onReject && (await options.onReject());
    await Promise.reject(Error('Unauthorized'));
  }

  options?.onSuccess && (await options.onSuccess(session));
  await Promise.resolve();
};
