import { Auth, CognitoUser } from '@aws-amplify/auth';
import { ClientMetaData } from '@aws-amplify/auth/lib-esm/types';

export interface AuthServiceOptions {
  authGroups?: string[];
}

const defaultOptions: AuthServiceOptions = {
  authGroups: [],
};

export class AuthService {
  public authGroups: string[];

  public constructor(options: AuthServiceOptions = defaultOptions) {
    const optionsBag = { ...defaultOptions, ...options };
    this.authGroups = <string[]>optionsBag.authGroups;
  }

  public login = ({
    username,
    email,
    password,
    clientMetadata,
  }: Record<string, unknown>): Promise<CognitoUser | unknown> => {
    return Auth.signIn(
      <string>username || <string>email,
      <string>password,
      <ClientMetaData>clientMetadata,
    );
  };

  public logout = (): Promise<any> => {
    return Auth.signOut();
  };

  public checkAuth = async (): Promise<void> => {
    const session = await Auth.currentSession();

    if (this.authGroups.length === 0) {
      return;
    }

    const userGroups = session.getAccessToken().decodePayload()['cognito:groups'];

    if (!userGroups) {
      throw new Error('Unauthorized');
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const group of userGroups) {
      if (this.authGroups.includes(group)) {
        return;
      }
    }

    throw new Error('Unauthorized');
  };

  public checkError = (error: Record<string, unknown>): Promise<void> => {
    if (error === null || typeof error !== 'object') {
      return Promise.resolve();
    }

    const { errors } = error;

    if (!errors || !Array.isArray(errors)) {
      return Promise.resolve();
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const e of errors) {
      if (e === null || typeof e !== 'object') {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (e.errorType === 'Unauthorized') {
        return Promise.reject(e);
      }
    }

    return Promise.resolve();
  };

  public getPermissions = async (): Promise<string[]> => {
    const session = await Auth.currentSession();
    const groups = session.getAccessToken().decodePayload()['cognito:groups'];

    return groups ? Promise.resolve(groups) : Promise.reject(new Error('No permissions'));
  };
}
