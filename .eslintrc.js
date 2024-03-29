module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb-typescript', // Uses the recommended rules from @airbnb-typescript
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Align prettier settings with eslint
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'no-empty': 0,
    'no-alert': 0,
    'no-console': 0,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/return-await': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-filename-extension': 0,
    'import/no-unresolved': 0,
    'react/no-array-index-key': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-implied-eval': 0,
    'react/prop-types': 0,
    'no-return-assign': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/no-throw-literal': 0,
    'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'import/extensions': [2, 'never', { json: 'always' }],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }], // (https://github.com/benmosher/eslint-plugin-import/issues/422#issuecomment-231076722)
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    '@typescript-eslint/no-unused-expressions': [2, { allowShortCircuit: true }],
    '@typescript-eslint/explicit-function-return-type': [0], // Disabled to improve code readability. No needed during writing React components
    '@typescript-eslint/indent': [0], // Disabled because prettier will handle this rule
    'react/state-in-constructor': [0], // Disabled because we want to allow to write components with and without constructor
    'react/button-has-type': [0], // Disabled because it not work well with TypeScript
    'react/jsx-boolean-value': [2, 'never'],
    'react/jsx-one-expression-per-line': [0], // Disabled because of prettier rules
    'react/jsx-props-no-spreading': [0],
    'react/jsx-fragments': [0], // Disabled for better code readability
    'jsx-a11y/click-events-have-key-events': [0], // Disabled (https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md)
    'jsx-a11y/no-static-element-interactions': [1], // As a warning (https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md)
    'jsx-a11y/label-has-associated-control': [0],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        paths: ['src'], // Resolve absolute path to modules
      },
    },
  },
  overrides: [
    {
      files: ['src/**/*.{js,ts,tsx}'],
      excludedFiles: ['src/**/*.test.{ts,tsx,js}'],
    },
  ],
};
