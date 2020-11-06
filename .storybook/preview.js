import React from 'react';
import { IntentbaseProvider } from '../src';

export const decorators = [
  (Story) => (
    <IntentbaseProvider>
      <Story />
    </IntentbaseProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
};
