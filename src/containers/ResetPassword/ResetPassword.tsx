import React, { FC, useCallback } from 'react';
import clsx from 'clsx';
import { FormInput } from '../../components/FormInput/FormInput';
import { Form, FormWithDefaultsProps } from '../../components/Form/Form';

export const ResetPassword: FC<FormWithDefaultsProps> = ({
  onSubmitResult,
  title = 'Reset your password',
  subheaderTitle = 'Please check your email for the one-time code to reset your password.',
  subheaderTitleVariant = 'body1',
  confirmButtonLabel = 'Reset password',
  codeLabel = 'Code',
  passwordLabel = 'Password',
  autoFocus = false,
  passwordPreview = true,
  children,
  className,
  ...rest
}) => {
  const onResetPassword = useCallback(async (): Promise<string> => {
    onSubmitResult && (await onSubmitResult({}));
    return 'done';
  }, []);

  return (
    <Form
      {...rest}
      onSubmit={onResetPassword}
      defaultValidationFields={['code', 'password']}
      confirmButtonLabel={confirmButtonLabel}
      title={title}
      className={clsx(className, 'resetPassword')}
      subheaderTitle={subheaderTitle}
      subheaderTitleVariant={subheaderTitleVariant}
    >
      <FormInput autoFocus={autoFocus} source="code" required label={codeLabel} />
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
