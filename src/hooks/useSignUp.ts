import { Auth } from '@aws-amplify/auth';
import { ISignUpResult } from 'amazon-cognito-identity-js';

export interface OnSignUpProps<T> extends ISignUpResult {
  formValues: T;
}

export interface UseSignUpProps {
  onSuccess?: (values: OnSignUpProps<any>) => Promise<void>;
  successMsg?: string;
}
export interface SignUpRequires {
  email: string;
  password: string;
}

// Examples
// 1.) signUp({ email, password });
// 2.) signUp<ValuesInterface>({ email, password, age });

export const useSignUp = ({ onSuccess, successMsg }: UseSignUpProps = {}) => {
  return async (props: any): Promise<string | undefined> => {
    const { email, password } = props;
    const formattedEmail = email.trim().toLowerCase();

    return Auth.signUp({
      username: formattedEmail,
      password,
      attributes: {
        email: formattedEmail,
      },
    }).then(async (result) => {
      let formValues = props;
      if (props?.passwordRepeat) {
        // eslint-disable-next-line no-unused-vars
        const { passwordRepeat, ...rest } = props;
        formValues = rest;
      }
      const packedUser = { ...result, formValues };
      onSuccess && (await onSuccess(packedUser));
      return successMsg;
    });
  };
};
