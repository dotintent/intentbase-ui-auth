import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { Container } from './PageLoad.styled';

export interface PageLoadingProps {
  label?: string;
  labelVariant?: Variant;
  size?: number;
}

export const PageLoading: FC<PageLoadingProps> = ({ label, labelVariant = 'h2', size = 100 }) => (
  <Container>
    {label && (
      <Typography variant={labelVariant} gutterBottom>
        {label}
      </Typography>
    )}
    <CircularProgress size={size} />
  </Container>
);
