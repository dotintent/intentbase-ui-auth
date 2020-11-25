import styled from 'styled-components';
import { Typography, TypographyProps } from '@material-ui/core';

export const FormActionsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export const FormInputsContainer = styled.div`
  .form__input {
    margin-bottom: 20px;
  }
  .form__input:first-child {
    margin-top: 20px;
  }
`;

export const FormLink = styled(Typography)`
  text-decoration: underline;
  cursor: pointer;
`;

export const FormSubheaderContent = styled.div`
  display: flex;
`;

export const FormSubheaderTitle = styled(Typography)<TypographyProps>`
  font-weight: ${({ variant }) => variant === 'h5' && 900};
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
