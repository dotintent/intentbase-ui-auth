import React, { FC, useCallback, useState } from 'react';
import { Auth } from 'aws-amplify';
import { PropTypes } from '@material-ui/core';
import { FormActionsProps } from '../../components/Form/Form';
import { useSnackbar } from '../../hooks/useSnackbar';
import { CognitoError } from '../../common/interfaces/CognitoError';
import { FormButton } from '../../components/FormButton';
import { StyledFormActionsContainer } from './ResendConfirmationCodeButton.styled';

export interface ResendConfirmationCodeBaseProps {
  resendCodeLabel?: string;
  onSuccessResendMsg?: string;
  resendButtonColor?: PropTypes.Color;
  fullWidth?: boolean;
}

type ResendConfirmationCodeProps = ResendConfirmationCodeBaseProps & FormActionsProps;

export const ResendConfirmationCodeButton: FC<ResendConfirmationCodeProps> = ({
  resendCodeLabel = 'Resend confirmation code',
  onSuccessResendMsg = 'Confirmation code resend successfully.',
  resendButtonColor = 'default',
  fullWidth = true,
  values,
  loading,
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const showSnackbar = useSnackbar();

  const resendCode = useCallback(async () => {
    setInternalLoading(true);
    await Auth.resendSignUp(values.email)
      .then(() => {
        showSnackbar({ message: onSuccessResendMsg, severity: 'success' });
      })
      .catch(({ message }: CognitoError) => {
        showSnackbar({ message, severity: 'error' });
      })
      .finally(() => {
        setInternalLoading(false);
      });
  }, [values.email]);

  return (
    <StyledFormActionsContainer>
      <FormButton
        color={resendButtonColor}
        disabled={loading || internalLoading}
        fullWidth={fullWidth}
        onClick={resendCode}
      >
        {resendCodeLabel}
      </FormButton>
    </StyledFormActionsContainer>
  );
};
