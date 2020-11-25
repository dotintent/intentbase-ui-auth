import { createMuiTheme, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const defaultTheme = createMuiTheme({
  palette: {
    primary: red,
  },
  shape: {
    borderRadius: 10,
  },
});

export const styled = baseStyled as ThemedStyledInterface<Theme>;
