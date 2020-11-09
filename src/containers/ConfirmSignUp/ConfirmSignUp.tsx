import React, { FC, useCallback } from 'react';
import { Auth } from 'aws-amplify';
import clsx from 'clsx';
import { FormInput } from '../../components/FormInput/FormInput';
import { Form, FormWithDefaultsProps } from '../../components/Form/Form';

export const ConfirmSignUp: FC<FormWithDefaultsProps> = ({
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
  ...rest
}) => {
  const confirmSignUp = useCallback(
    async (values: any) =>
      Auth.confirmSignUp(values.email, values.code).then(async (result) => {
        onSubmitResult && (await onSubmitResult(result));
        return onSuccessLoginMsg;
      }),
    [],
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
    >
      <FormInput autoFocus={autoFocus} source="email" required label={emailLabel} />
      <FormInput source="code" required label={codeLabel} />
      {children}
    </Form>
  );
};
