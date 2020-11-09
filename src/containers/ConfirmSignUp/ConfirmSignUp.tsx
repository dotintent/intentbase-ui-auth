import React, { FC, useCallback, useState } from 'react';
import { Auth } from 'aws-amplify';
import clsx from 'clsx';
import styled from 'styled-components';
import { FormInput } from '../../components/FormInput/FormInput';
import { Form, FormActionsProps, FormWithDefaultsProps } from '../../components/Form/Form';
import { FormButton } from '../../components/FormButton';
import { useSnackbar } from '../../components/SnackbarProvider';
import { CognitoError } from '../../common/interfaces/CognitoError';

const FormActionsContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

interface ResendConfirmationCodeProps extends FormActionsProps {
  resendCodeLabel?: string;
}

const ResendConfirmationCode: FC<ResendConfirmationCodeProps> = ({
  resendCodeLabel = 'Resend confirmation code',
  values,
  loading,
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const showSnackbar = useSnackbar();

  const resendCode = useCallback(async () => {
    setInternalLoading(true);
    await Auth.resendSignUp(values.email)
      .then(() => {
        showSnackbar({ message: 'Confirmation code successfully resend.', severity: 'success' });
      })
      .catch(({ message }: CognitoError) => {
        showSnackbar({ message, severity: 'error' });
      })
      .finally(() => {
        setInternalLoading(false);
      });
  }, [values.email]);

  return (
    <FormActionsContainer>
      <FormButton
        color="default"
        disabled={loading || internalLoading}
        fullWidth
        onClick={resendCode}
      >
        {resendCodeLabel}
      </FormButton>
    </FormActionsContainer>
  );
};

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
      formActionsBeforeConfirm={<ResendConfirmationCode />}
    >
      <FormInput autoFocus={autoFocus} source="email" required label={emailLabel} />
      <FormInput source="code" required label={codeLabel} />
      {children}
    </Form>
  );
};
