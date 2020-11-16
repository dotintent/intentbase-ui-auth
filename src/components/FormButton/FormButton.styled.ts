import styled from 'styled-components';
import { Button, ButtonProps, CircularProgress, CircularProgressProps } from '@material-ui/core';

export const StyledButton = styled(Button)<ButtonProps>`
  height: 50px;
  text-transform: none;
  font-size: 16px;
`;

export const StyledProgress = styled(CircularProgress)<CircularProgressProps>`
  margin-right: 12px;
`;
