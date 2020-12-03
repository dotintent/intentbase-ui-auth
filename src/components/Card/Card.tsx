import React, { FC } from 'react';
import { Card as MuiCard, CardContent, CardProps as MuiCardProps } from '@material-ui/core';
import { styled } from '../../theme';

const StyledCard = styled(MuiCard)`
  padding: 1rem;
  width: 100%;
  min-width: 200px;
  max-width: 500px;
  margin: 50px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const StyledFullWidthCard = styled(MuiCard)`
  padding: 1rem;
  width: 100%;
  min-width: 200px;
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
  // Wrapper solves the problem with attributes warning (https://styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings)
  const Wrapper: FC<MuiCardProps> = (props) =>
    fullWidth ? <StyledFullWidthCard {...props} /> : <StyledCard {...props} />;

  return (
    <Wrapper raised={raised}>
      <CardContent>{children}</CardContent>
    </Wrapper>
  );
};
