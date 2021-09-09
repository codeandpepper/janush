# Janush ![License: MIT](https://img.shields.io/badge/License-MIT-green.svg) [![Test application generation](https://github.com/codeandpepper/janush/actions/workflows/main.yml/badge.svg)](https://github.com/codeandpepper/janush/actions/workflows/main.yml)

## User Guide

You can find detailed instructions on using Create React App and many tips [its documentation](https://codeandpepper.github.io/janush/).


## Quick Overview


### Using npx
You can run the project directly using npx command below:

```sh
npx codeandpepper/janush janush
```

### Local development

```sh
npm install -g @angular-devkit/schematics-cli

schematics .:app --debug=false
schematics .:application --name=fancy-app --types={web,cloud} --debug=false
```

Currently, to generate a project, you must first  run the `yarn install` command and after `yarn build`. In root directory you can create your own project via schematic commands.

## What’s Included?

Your environment will have everything you need to build a modern single-page React app with built-in Identity/AuthN/AuthZ features.

### Features

* Sign up
* Email verification
* Sign in

### Technology

We are using [serverless services on AWS](https://aws.amazon.com/serverless/#Serverless_Services_on_AWS) (Amazon Web Services) and TypeScript in all apects of the project, starting from React frontend, Node.js (AWS Lambda) backend and IaC (Infrastructure as Code) using AWS CDK (Cloud Development Kit).

#### Frontend
* React, Typescript
* Material-UI
* Amplify Libraries

#### Cloud
* Amazon Cognito
* AWS Lambda, Node.js, TypeScript
* Amazon S3 (Simple Storage Service)
* Amazon SES (Simple Email Service)
* Amazon Pinpoint
* AWS CDK (Cloud Development Kit), TypeScript

## Contributing

We'd love to have your helping hand on `janush`! See [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021, [Code & Pepper](https://codeandpepper.com/)
