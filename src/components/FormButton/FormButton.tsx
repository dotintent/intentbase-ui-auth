import React, { FC } from 'react';
import { ButtonProps } from '@material-ui/core';
import { StyledButton, StyledProgress } from './FormButton.styled';

export interface FormButtonProps extends ButtonProps {
  loading?: boolean;
}

export const FormButton: FC<FormButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  color = 'primary',
  variant = 'contained',
  ...rest
}) => {
  return (
    <StyledButton {...rest} color={color} variant={variant} disabled={loading ? true : disabled}>
      {loading && <StyledProgress size={16} thickness={4} color="primary" />}
      {children}
    </StyledButton>
  );
};
