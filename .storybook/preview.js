import React from 'react';
import { IntentbaseProvider } from '../src/providers/IntentbaseProvider';

export const decorators = [
  (Story) => (
    <IntentbaseProvider
      environment={process.env.AWS_COGNITO_REGION}
      awsCognitoRegion={process.env.AWS_COGNITO_REGION}
      awsCognitoUserPoolId={process.env.AWS_COGNITO_USER_POOL_ID}
      awsCognitoUserPoolWebClientId={process.env.AWS_COGNITO_USER_POOL_CLIENT_ID}
    >
      <Story />
    </IntentbaseProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
};
