# Intentbase UI Auth

![CI](https://github.com/dotintent/intentbase-ui-auth/workflows/Continuous%20Integration/badge.svg)

## Table of Contents

- [About](#-about)
- [Getting started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Prepare and fill secrets](#-prepare-and-fill-secrets)
  - [Running the app](#-running-the-app)
- [Available scripts](#-available-scripts)
- [Useful docs](#-useful-docs)

## About

UI React components for Log in, Register and Forgot password, to use with auth providers like Cognito

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 12
- [Yarn](https://classic.yarnpkg.com/lang/en/) >=1.22

### Installation

```shell script
yarn install
```

### Prepare and fill secrets

Copy and paste .env.example into .env and fill all secrets.

| Secret   | Description               | Default |
| -------- | ------------------------- | ------- |
| NODE_ENV | Define current enviroment | -       |

### Running the app

```shell script
yarn storybook
```

## Available scripts

To run script, in terminal type `yarn {script}`.

| Script         | Description                             | Note                                       |
| -------------- | --------------------------------------- | ------------------------------------------ |
| `preinstall`   | Checks is yarn was used package manager | It runs automatically before every install |
| `prebuild`     | Runs yarn clean                         | It runs automatically before every build   |
| `start`        | Starts app locally                      |                                            |
| `clean`        | Removes build directory if it exists    |                                            |
| `build`        | Builds app                              |                                            |
| `serve`        | Serves locally app from build directory | Before serve, run `yarn build`             |
| `test`         | Runs test for utils and helpers         |                                            |
| `type-check`   | Checks TypeScript types                 |                                            |
| `format:check` | Checks prettier rules                   |                                            |
| `format`       | Fix prettier                            |                                            |
| `lint`         | Fix linter                              |                                            |
| `lint:check`   | Checks linter rules                     |                                            |

## Publishing

```shell script
npm publish --access=public
```

## Useful docs

- [Create React App](https://github.com/facebook/create-react-app)
- [React Admin](https://marmelab.com/react-admin/Readme.html)
