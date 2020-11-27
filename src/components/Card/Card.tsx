import React, { FC } from 'react';
import { Card as MuiCard, CardContent, CardProps as MuiCardProps } from '@material-ui/core';
import { styled } from '../../theme';

interface StyledCardProps extends MuiCardProps {
  fullWidth?: boolean;
}

const StyledCard = styled(MuiCard)<StyledCardProps>`
  padding: 1rem;
  width: 100%;
  min-width: 200px;
  ${({ fullWidth }) => (fullWidth ? null : 'max-width: 500px')};
  margin: 50px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

export interface CardProps extends MuiCardProps {
  fullWidth?: boolean;
}

export const Card: FC<CardProps> = ({ fullWidth = false, children, raised = true }) => {
  return (
    <StyledCard fullWidth={fullWidth} raised={raised}>
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};
