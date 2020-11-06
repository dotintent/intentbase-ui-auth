import React, { FC } from 'react';
import { Button, ButtonProps, CircularProgress, CircularProgressProps } from '@material-ui/core';
import styled from 'styled-components';

const StyledButton = styled(Button)<ButtonProps>`
  height: 50px;
  text-transform: none;
  font-size: 16px;
`;

const StyledProgress = styled(CircularProgress)<CircularProgressProps>`
  margin-right: 12px;
`;

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
