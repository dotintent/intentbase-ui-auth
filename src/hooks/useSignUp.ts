import { Auth } from '@aws-amplify/auth';
import { ISignUpResult } from 'amazon-cognito-identity-js';

export interface OnSignUpProps<T> extends ISignUpResult {
  formValues: T;
}

export interface UseSignUpProps {
  onSignUp?: (values: OnSignUpProps<any>) => Promise<void>;
  onSuccessSignUpMsg: string;
}
export interface SignUpRequires {
  email: string;
  password: string;
}

// Examples
// 1.) signUp({ email, password });
// 2.) signUp<ValuesInterface>({ email, password, age });

export const useSignUp = ({ onSignUp, onSuccessSignUpMsg }: UseSignUpProps) => {
  return async <T extends SignUpRequires>(props: any): Promise<string | undefined> => {
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
      onSignUp && (await onSignUp(packedUser));
      return onSuccessSignUpMsg;
    });
  };
};
