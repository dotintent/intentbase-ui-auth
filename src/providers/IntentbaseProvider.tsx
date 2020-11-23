import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { defaultTheme } from '../theme';
import { configureAmplify } from '../utils/configureAmplify';
import { SnackbarContextProvider } from './SnackbarProvider';
import { AuthContextProvider } from './auth/AuthProvider';
import { ApiProvider } from './auth/ApiProvider';
import { CognitoUser } from './auth/useCognitoUser';

type Environment = 'production' | 'development' | 'test';

interface IntentbaseProps {
  theme?: Partial<Theme> | ((outerTheme: Theme) => Theme);
  region?: string;
  userPoolId?: string;
  userPoolWebClientId?: string;
  environment?: Environment;
  getApiUser?: (cognitoUser?: CognitoUser) => Promise<any>;
}

export const IntentbaseProvider: FC<IntentbaseProps> = ({
  children,
  region = 'us-east-1',
  userPoolId,
  userPoolWebClientId,
  theme = defaultTheme,
  environment = 'production',
  getApiUser,
}) => {
  if (!userPoolId || !userPoolWebClientId) {
    if (environment !== 'production') {
      return <h1>AWS Secrets required</h1>;
    }
    return null;
  }

  configureAmplify(region, userPoolId, userPoolWebClientId);

  const defaultFetchUser = async (user?: any) => user;

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <ApiProvider>
            <AuthContextProvider getApiUser={getApiUser || defaultFetchUser}>
              <SnackbarContextProvider>{children}</SnackbarContextProvider>
            </AuthContextProvider>
          </ApiProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};
