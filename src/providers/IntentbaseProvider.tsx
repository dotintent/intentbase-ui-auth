import React, { useRef, FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { OAuthOpts } from '@aws-amplify/auth/lib/types';
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
  awsCognitoOAuth?: OAuthOpts;
  environment?: Environment;
  getApiUser?: (cognitoUser?: CognitoUser) => Promise<any>;
}

export const IntentbaseProvider: FC<IntentbaseProps> = ({
  children,
  awsCognitoRegion = 'us-east-1',
  awsCognitoUserPoolId,
  awsCognitoUserPoolWebClientId,
  awsCognitoOAuth,
  theme = defaultTheme,
  environment = 'production',
  getApiUser,
}) => {
  const isAmplifyConfiguredRef = useRef(false);
  try {
    if (!isAmplifyConfiguredRef.current) {
      isAmplifyConfiguredRef.current = true;
      configureAmplify(
        awsCognitoRegion,
        awsCognitoUserPoolId,
        awsCognitoUserPoolWebClientId,
        awsCognitoOAuth,
      );
    }
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
