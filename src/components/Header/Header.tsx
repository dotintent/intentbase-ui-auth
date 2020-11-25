import { Typography, TypographyProps } from '@material-ui/core';
import React, { FC } from 'react';

export const Header: FC<TypographyProps> = ({
  variant = 'h3',
  align = 'center',
  gutterBottom = true,
  children,
  ...rest
}) => (
  <Typography {...rest} variant={variant} align={align} gutterBottom={gutterBottom}>
    {children}
  </Typography>
);
