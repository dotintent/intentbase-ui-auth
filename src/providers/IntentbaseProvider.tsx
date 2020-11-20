import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { defaultTheme } from '../theme';
import { configureAmplify } from '../utils/configureAmplify';
import { SnackbarContextProvider } from './SnackbarProvider';
import { AuthContextProvider } from './auth/AuthProvider';

type Environment = 'production' | 'development' | 'test';

interface IntentbaseProps {
  theme?: Partial<Theme> | ((outerTheme: Theme) => Theme);
  region?: string;
  userPoolId?: string;
  userPoolWebClientId?: string;
  environment?: Environment;
}

export const IntentbaseProvider: FC<IntentbaseProps> = ({
  children,
  region = 'us-east-1',
  userPoolId,
  userPoolWebClientId,
  theme = defaultTheme,
  environment = 'production',
}) => {
  if (!userPoolId || !userPoolWebClientId) {
    if (environment !== 'production') {
      return <h1>AWS Secrets required</h1>;
    }
    return null;
  }

  configureAmplify(region, userPoolId, userPoolWebClientId);

  const fetchUser = async () => {
    return new Promise((resolve) => {
      resolve('joe');
    });
  };

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <AuthContextProvider getApiUser={fetchUser}>
            <SnackbarContextProvider>{children}</SnackbarContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};
