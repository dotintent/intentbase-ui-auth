import React, { FC, useCallback } from 'react';
import { Auth } from 'aws-amplify';
import clsx from 'clsx';
import { FormInput } from '../../components/FormInput/FormInput';
import { Form, FormWithDefaultsProps } from '../../components/Form/Form';
import {
  ResendConfirmationCodeButton,
  ResendConfirmationCodeBaseProps,
} from './ResendConfirmationCodeButton';

export type ConfirmSignUpProps = FormWithDefaultsProps & ResendConfirmationCodeBaseProps;

export const ConfirmSignUp: FC<ConfirmSignUpProps> = ({
  onSubmitResult,
  title = 'Confirm Sign Up',
  subheaderTitle = 'Please check your email for the one-time code to confirm your account.',
  subheaderTitleVariant = 'body1',
  confirmButtonLabel = 'Confirm sign up',
  onSuccessLoginMsg = 'Sign up confirmed.',
  codeLabel = 'Code',
  emailLabel = 'Email',
  autoFocus = false,
  children,
  className,
  resendCodeLabel = 'Resend confirmation code',
  onSuccessResendMsg = 'Confirmation code resend successfully.',
  resendButtonColor = 'default',
  ...rest
}) => {
  const confirmSignUp = useCallback(async (values: any) => {
    const { email, code } = values;
    const formattedEmail = email.trim().toLowerCase();

    return Auth.confirmSignUp(formattedEmail, code).then(async (result) => {
      onSubmitResult && (await onSubmitResult(result));
      return onSuccessLoginMsg;
    });
  }, []);

  const formActionsBeforeConfirm = (
    <ResendConfirmationCodeButton
      onSuccessResendMsg={onSuccessResendMsg}
      resendCodeLabel={resendCodeLabel}
      resendButtonColor={resendButtonColor}
    />
  );

  return (
    <Form
      {...rest}
      title={title}
      subheaderTitle={subheaderTitle}
      subheaderTitleVariant={subheaderTitleVariant}
      onSubmit={confirmSignUp}
      defaultValidationFields={['email', 'code']}
      className={clsx(className, 'confirmSignUp')}
      confirmButtonLabel={confirmButtonLabel}
      formActionsBeforeConfirm={formActionsBeforeConfirm}
    >
      <FormInput autoFocus={autoFocus} source="email" required label={emailLabel} />
      <FormInput source="code" required label={codeLabel} />
      {children}
    </Form>
  );
};
