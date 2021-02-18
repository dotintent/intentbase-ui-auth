import React, { FC, useCallback, useState } from 'react';
import { PropTypes } from '@material-ui/core';
import { FormActionsProps } from '../../components/Form/Form';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useRequestConfirmationCode } from '../../hooks/useRequestConfirmationCode';
import { FormButton } from '../../components/FormButton/FormButton';
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
  const resendCode = useRequestConfirmationCode();

  const requestCode = useCallback(async () => {
    setInternalLoading(true);
    const { email } = values;

    try {
      await resendCode(email);
      showSnackbar({ message: onSuccessResendMsg, severity: 'success' });
    } catch (error) {
      showSnackbar({
        message: error?.message || 'Oops, Something went wrong',
        severity: 'error',
      });
    }

    setInternalLoading(false);
  }, [values.email]);

  return (
    <StyledFormActionsContainer>
      <FormButton
        color={resendButtonColor}
        disabled={loading || internalLoading}
        fullWidth={fullWidth}
        onClick={requestCode}
      >
        {resendCodeLabel}
      </FormButton>
    </StyledFormActionsContainer>
  );
};
