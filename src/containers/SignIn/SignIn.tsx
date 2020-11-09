import React, { FC, useCallback, useState } from 'react';
import { Auth } from 'aws-amplify';
import clsx from 'clsx';
import { CognitoUser } from '../../hooks/useUser';
import { Form, FormWithDefaultsProps } from '../../components/Form/Form';
import { FormInput } from '../../components/FormInput/FormInput';
import { StyledForgotPassword } from './SignIn.styled';

export interface SignInProps extends FormWithDefaultsProps {
  forgotPasswordLabel?: string;
  onForgotPasswordClick?: () => void;
}

export const SignIn: FC<SignInProps> = ({
  onSubmitResult,
  title = 'Sign In',
  forgotPasswordLabel = 'Forgot password',
  confirmButtonLabel = 'Sign In',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  onSuccessLoginMsg = 'Successful login.',
  onForgotPasswordClick,
  autoFocus = false,
  passwordPreview = true,
  children,
  className,
  ...rest
}) => {
  const [cognitoUser, setCognitoUser] = useState<CognitoUser>();
  const [cognitoUserSession, setCognitoUserSession] = useState<CognitoUser>();
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(
    'L:71 | cognitoUser, cognitoUserSession, loggedIn: ',
    cognitoUser,
    cognitoUserSession,
    loggedIn,
  );

  const signIn = useCallback(
    async (values): Promise<string> =>
      Auth.signIn({
        username: values.email,
        password: values.password,
        ...values,
      }).then(async (user) => {
        setCognitoUser(user);
        setCognitoUserSession(user.signInUserSession);
        setLoggedIn(true);
        onSubmitResult && (await onSubmitResult(user));
        return onSuccessLoginMsg;
      }),
    [],
  );

  return (
    <Form
      {...rest}
      onSubmit={signIn}
      title={title}
      defaultValidationFields={['email', 'password']}
      confirmButtonLabel={confirmButtonLabel}
      className={clsx(className, 'signIn')}
      formActions={
        forgotPasswordLabel && forgotPasswordLabel ? (
          <StyledForgotPassword
            color="primary"
            className="form__action__btn--forgotPassword"
            variant="body1"
            onClick={onForgotPasswordClick}
          >
            {forgotPasswordLabel}
          </StyledForgotPassword>
        ) : undefined
      }
    >
      <FormInput autoFocus={autoFocus} source="email" required label={emailLabel} />
      <FormInput
        source="password"
        required
        passwordPreview={passwordPreview}
        label={passwordLabel}
      />
      {children}
    </Form>
  );
};
