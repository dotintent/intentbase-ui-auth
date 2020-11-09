import React, { FC, useCallback, useState } from 'react';
import { Auth } from 'aws-amplify';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { Form, FormWithDefaultsProps } from '../../components/Form/Form';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormLink } from '../../components/Form/Form.styled';

export interface SignUpProps extends FormWithDefaultsProps {
  onClickSignIn?: () => void;
  subheaderHaveAnAccount?: string;
  subheaderSignIn?: string;
}

export const SignUp: FC<SignUpProps> = ({
  onSubmitResult,
  title = 'Sign Up',
  subheaderTitle = 'Your Info',
  subheaderHaveAnAccount = 'Have an Account?',
  subheaderSignIn = 'Sign In',
  confirmButtonLabel = 'Sign Up',
  onSuccessLoginMsg = 'Successful registration.',
  emailLabel = 'Email',
  onClickSignIn,
  passwordLabel = 'Password',
  autoFocus = false,
  passwordPreview = true,
  children,
  className,
  ...rest
}) => {
  const [cognitoUser, setCognitoUser] = useState<any>();
  const [cognitoUserSession, setCognitoUserSession] = useState<any>();
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(
    'L:71 | cognitoUser, cognitoUserSession, loggedIn: ',
    cognitoUser,
    cognitoUserSession,
    loggedIn,
  );

  const signUp = useCallback(
    async (values: any): Promise<string> =>
      Auth.signUp({
        username: values.email,
        password: values.password,
        attributes: {
          email: values.email,
        },
      }).then(async (result) => {
        setCognitoUser(result.user);
        setCognitoUserSession(result.user.getSignInUserSession());
        setLoggedIn(true);
        onSubmitResult && (await onSubmitResult(result));
        return onSuccessLoginMsg;
      }),
    [],
  );

  const SubheaderContent = () => (
    <>
      {subheaderHaveAnAccount && (
        <Typography variant="body1" gutterBottom className="signUp__subheader__section--text">
          {subheaderHaveAnAccount}
        </Typography>
      )}
      &nbsp;
      {onClickSignIn && subheaderSignIn && (
        <FormLink
          color="primary"
          className="signUp__subheader__section--link"
          onClick={onClickSignIn}
        >
          {subheaderSignIn}
        </FormLink>
      )}
    </>
  );

  return (
    <Form
      {...rest}
      title={title}
      onSubmit={signUp}
      defaultValidationFields={['email', 'password']}
      confirmButtonLabel={confirmButtonLabel}
      className={clsx(className, 'signUp')}
      subheaderTitle={subheaderTitle}
      subheaderContent={<SubheaderContent />}
    >
      <FormInput autoFocus={autoFocus} source="email" label={emailLabel} required />
      <FormInput
        source="password"
        passwordPreview={passwordPreview}
        label={passwordLabel}
        required
      />
      {children}
    </Form>
  );
};
