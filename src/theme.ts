import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const defaultTheme = createMuiTheme({
  palette: {
    primary: red,
  },
  shape: {
    borderRadius: 10,
  },
});
