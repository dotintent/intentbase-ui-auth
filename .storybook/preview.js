import React from 'react';
import { IntentbaseProvider } from '../src/providers/IntentbaseProvider';

export const decorators = [
  (Story) => (
    <IntentbaseProvider
      region={process.env.COGNITO_AWS_REGION}
      userPoolId={process.env.COGNITO_USER_POOL_ID}
      userPoolWebClientId={process.env.COGNITO_USER_POOL_CLIENT_ID}
    >
      <Story />
    </IntentbaseProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
};
