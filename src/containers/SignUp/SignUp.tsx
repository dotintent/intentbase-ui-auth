import React, { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { Form, FormWithDefaultsProps } from '../../components/Form/Form';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormLink } from '../../components/Form/Form.styled';
import { TypographyColor } from '../../common/interfaces/MaterialUI';
import { useSignUp } from '../../hooks/useSignUp';

export interface SignUpProps extends FormWithDefaultsProps {
  onClickSignIn?: () => void;
  subheaderHaveAnAccount?: string;
  subheaderSignIn?: string;
  subheaderSignInBtnColor?: TypographyColor;
  passwordRepeat?: boolean;
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
  passwordRepeat = false,
  children,
  className,
  subheaderSignInBtnColor = 'primary',
  ...rest
}) => {
  const signUp = useSignUp({ onSuccessSignUpMsg: onSuccessLoginMsg, onSignUp: onSubmitResult });

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
          color={subheaderSignInBtnColor}
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
        repeat={passwordRepeat}
        required
      />
      {children}
    </Form>
  );
};
