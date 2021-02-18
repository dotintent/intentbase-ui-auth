import React, { FC } from 'react';
import clsx from 'clsx';
import { Form, FormWithDefaultsProps } from '../../components/Form/Form';
import { FormInput } from '../../components/FormInput/FormInput';
import { StyledForgotPassword } from './SignIn.styled';
import { useLogin } from '../../hooks/useLogin';

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
  const signIn = useLogin({ onSuccess: onSubmitResult, successMsg: onSuccessLoginMsg });

  return (
    <>
      <Form
        {...rest}
        onSubmit={signIn}
        title={title}
        defaultValidationFields={['email', 'password']}
        confirmButtonLabel={confirmButtonLabel}
        className={clsx(className, 'signIn')}
        formActionsBeforeConfirm={
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
    </>
  );
};
