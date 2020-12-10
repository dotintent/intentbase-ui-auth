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
  awsCognitoRegion?: string;
  awsCognitoUserPoolId: string;
  awsCognitoUserPoolWebClientId: string;
  environment?: Environment;
  getApiUser?: (cognitoUser?: CognitoUser) => Promise<any>;
}

export const IntentbaseProvider: FC<IntentbaseProps> = ({
  children,
  awsCognitoRegion = 'us-east-1',
  awsCognitoUserPoolId,
  awsCognitoUserPoolWebClientId,
  theme = defaultTheme,
  environment = 'production',
  getApiUser,
}) => {
  try {
    configureAmplify(awsCognitoRegion, awsCognitoUserPoolId, awsCognitoUserPoolWebClientId);
  } catch (error) {
    if (environment !== 'production') {
      console.error('AWS Secrets required');
    }
  }

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
