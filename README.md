# Intentbase UI Auth

![CI](https://github.com/dotintent/intentbase-ui-auth/workflows/Continuous%20Integration/badge.svg)

## Table of Contents

- [About](#-about)
- [Getting started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Prepare and fill secrets](#-prepare-and-fill-secrets)
  - [Running the app](#-running-the-app)
- [Conventional Commits](#-conventional-commits)
- [Available scripts](#-available-scripts)
- [Useful docs](#-useful-docs)
- [License](#-license)

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

> _Important Note:_ AWS secrets must be filled before starting storybook.

| Secret                          | Description                | Default   |
| ------------------------------- | -------------------------- | --------- |
| NODE_ENV                        | Define current environment | -         |
| AWS_COGNITO_REGION              |                            | eu-west-1 |
| AWS_COGNITO_USER_POOL_ID        |                            | -         |
| AWS_COGNITO_USER_POOL_CLIENT_ID |                            | -         |

### Running the app

```shell script
yarn storybook
```

## Conventional Commits

Commitlint checks if your commit messages meet the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format.

Example:

```git
feat(blog): add comment section
```

Common types according to commitlint-config-conventional (based on the Angular convention) can be:
[conventional-commit-types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json)

## Available scripts

To run script, in terminal type `yarn {script}`.

| Script         | Description                             | Note                                       |
| -------------- | --------------------------------------- | ------------------------------------------ |
| `prepublish`   | Builds components                       | It runs automatically before every publish |
| `preinstall`   | Checks is yarn was used package manager | It runs automatically before every install |
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
- [AWS Amplify Auth](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js)
- [Styled-components](https://styled-components.com/docs)
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Docusaurus](https://v2.docusaurus.io/docs/)

## License
Copyright 2020 Intent.
Licensed under the [MIT license](LICENSE).
