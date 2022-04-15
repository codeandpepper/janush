 Janush ![License: MIT](https://img.shields.io/badge/License-MIT-green.svg) [![Test application generation](https://github.com/codeandpepper/janush/actions/workflows/main.yml/badge.svg)](https://github.com/codeandpepper/janush/actions/workflows/main.yml)
# Janush



## Quick Overview
Janush is web based application for rapid setup and configure application with predefined sections:
    - Security
    - AWS integration
    - Basic component creation

#### Technology

We are using [serverless services on AWS](https://aws.amazon.com/serverless/#Serverless_Services_on_AWS) (Amazon Web Services) and TypeScript in all apects of the project, starting from React frontend, Node.js (AWS Lambda) backend and IaC (Infrastructure as Code) using AWS CDK v2 (Cloud Development Kit).


### Requirements
Package | Version
--- | --- 
Node.js | 16.x.x 

### Install Janush CLI
You can install the project directly with the following command:

```sh
npm install -g @codeandpepper/janush
```

The application will be available under the command `janush`

### Local development

```sh
npm install -g @angular-devkit/schematics-cli

schematics .:app --debug=false
schematics .:application --name=fancy-app --types={web,cloud} --debug=false
```

Currently, to generate a project, you must first  run the `npm install` command and after `npm run build`. In root directory you can create your own project via schematic commands.

#### Linking to local npm repositories

It's possible to link a package into your local npm packages by running:
```sh
npm run build
npm link
```
and then easily use it:
``` 
janush --name=fancy-app --types={web,cloud}
``` 
<p>New application based on Janush schematcis can be created in following ways:</p>

``` schematics .:app --debug=false ```

This option creating application in *interactive* mode its mean, that every configuration input (name, types, debug) will be choosen during interactive wizard
 ![Setup new app in interactive mode](https://janush-docs.s3.eu-central-1.amazonaws.com/images/interactive-setup.gif)


- `` schematics .:application --name=fancy-app --types={web,cloud} --debug=false ``

 Above command generated new application inside *janush* app folder

 ![generated application](https://janush-docs.s3.eu-central-1.amazonaws.com/images/generated-application.jpg)

 ## Steps to run application
 - Go to web or cloud folder inside generated application
 - execute `` npm ``
 - run `` npm start `` 
  - It may happend that `` npm start `` will throw error:
  ```

    To fix the dependency tree, try following the steps below in the exact order:

    1. Delete package-lock.json (not package.json!) and/or yarn.lock in your project folder.
    2. Delete node_modules in your project folder.
    3. Remove "babel-jest" from dependencies and/or devDependencies in the package.json file in your project folder.
    4. Run npm install or yarn, depending on the package manager you use.

    In most cases, this should be enough to fix the problem.
    If this has not helped, there are a few other things you can try:

    1. If you used npm, install yarn (http://yarnpkg.com/) and repeat the above steps with it instead.
        This may help because npm has known issues with package hoisting which may get resolved in future versions.

    2. Check if /Users/[userdir]/janush/node_modules/babel-jest is outside your project directory.
        For example, you might have accidentally installed something in your home folder.

    3. Try running npm ls babel-jest in your project folder.
        This will tell you which other package (apart from the expected react-scripts) installed babel-jest.

    If nothing else helps, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
    That would permanently disable this preflight check in case you want to proceed anyway.

  ```

Error above can be resolve by creating **.env** file. execute `` code .env `` and paste **SKIP_PREFLIGHT_CHECK=true** then hit save

`` npm start ``  should automatically open browser with generated application. Otherwise app by default is generated under *http://localhost:3000*

![app started](https://janush-docs.s3.eu-central-1.amazonaws.com/images/landing-page.jpg)

Loggin and sign up doesn't works by default - some configuration need to be completed [AWS Setup](#aws)

# Schematics learning resources

https://tomastrajan.medium.com/total-guide-to-custom-angular-schematics-5c50cf90cdb4
# Debug schematics

Run command 
``` node --inspect-brk $(which schematics) .:app --name=test123 --debug=false  ```
1. Open chrome://inspect (for Chrome)
2. Click on *Open deicated DevTools for Node*
   ![DevTools](https://janush-docs.s3.eu-central-1.amazonaws.com/images/debug-devtools-1.jpg)
3. Debugging panel is accesible
![DevTools](https://janush-docs.s3.eu-central-1.amazonaws.com/images/debug-devtools-2.jpg)
# Test e2e

### `` npm run test ``

 If **babel-jest** is missing error is generated:
 
```
    The react-scripts package provided by Create React App requires a dependency:

    "babel-jest": "^26.6.0"
```


It may happend that error above is visible. It's indicating that babel is not installed, for fix this problem 
** npm install babel-jest@26.6.0 -g **

Successfull output should look as follow:
 ```PASS  src/components/PasswordField/PasswordField.test.tsx (235.068 s)
    PASS  src/routing/routes/SignIn/SignIn.test.tsx (237.66 s)
    PASS  src/routing/routes/SignUp/SignUp.test.tsx (239.08 s)
    PASS  src/routing/routes/ConfirmSignUp/ConfirmSignUp.test.tsx
    PASS  src/routing/Routes.test.tsx
    PASS  src/components/AuthBottomBar/AuthBottomBar.test.tsx
    PASS  src/layouts/PageLayout/PageLayout.test.tsx
    PASS  src/routing/routes/SignUp/SignUpView/SignUpForm/SignUpForm.test.tsx (7.965 s)
    PASS  src/utils/formDataTestId/formDataTestId.test.ts
    PASS  src/routing/routes/VerifyEmail/VerifyEmail.test.tsx (13.736 s)
    PASS  src/App.test.tsx
```

-------------------------------------------------|---------|----------|---------|---------|-------------------
File                                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------------------------------|---------|----------|---------|---------|-------------------
All files                                        |   92.72 |    83.33 |   89.47 |   95.48 |
 src                                             |     100 |      100 |     100 |     100 |
  App.tsx                                        |     100 |      100 |     100 |     100 |
 src/components/AuthBottomBar                    |     100 |      100 |     100 |     100 |
  AuthBottomBar.tsx                              |     100 |      100 |     100 |     100 |
 src/components/EmailField                       |     100 |      100 |     100 |     100 |
  EmailField.tsx                                 |     100 |      100 |     100 |     100 |
 src/components/Form                             |     100 |      100 |     100 |     100 |
  Form.tsx                                       |     100 |      100 |     100 |     100 |
 src/components/Link                             |     100 |      100 |     100 |     100 |
  Link.tsx                                       |     100 |      100 |     100 |     100 |
 src/components/PasswordField                    |    90.9 |      100 |      80 |      90 |
  PasswordField.tsx                              |    90.9 |      100 |      80 |      90 | 36
 src/components/TextField                        |     100 |      100 |     100 |     100 |
  TextField.tsx                                  |     100 |      100 |     100 |     100 |
 src/consts                                      |     100 |      100 |     100 |     100 |
  index.ts                                       |     100 |      100 |     100 |     100 |
 src/interfaces                                  |       0 |        0 |       0 |       0 |
  Cognito.ts                                     |       0 |        0 |       0 |       0 |
  User.ts                                        |       0 |        0 |       0 |       0 |
 src/layouts/AuthLayout                          |     100 |      100 |     100 |     100 |
  AuthLayout.tsx                                 |     100 |      100 |     100 |     100 |
  styles.ts                                      |     100 |      100 |     100 |     100 |
 src/layouts/Logo                                |     100 |      100 |     100 |     100 |
  Logo.tsx                                       |     100 |      100 |     100 |     100 |
  styles.ts                                      |     100 |      100 |     100 |     100 |
 src/layouts/PageLayout                          |     100 |      100 |     100 |     100 |
  PageLayout.tsx                                 |     100 |      100 |     100 |     100 |
 src/layouts/TopAppBar                           |   57.14 |       50 |      50 |   57.14 |
  TopAppBar.tsx                                  |   57.14 |       50 |      50 |   57.14 | 14-17
 src/routing                                     |   66.66 |      100 |   33.33 |    87.5 |
  Routes.tsx                                     |   66.66 |      100 |   33.33 |    87.5 | 7
  paths.ts                                       |       0 |        0 |       0 |       0 |
 src/routing/routes/ConfirmSignUp                |     100 |      100 |     100 |     100 |
  ConfirmSignUp.tsx                              |     100 |      100 |     100 |     100 |
 src/routing/routes/Index                        |     100 |      100 |     100 |     100 |
  IndexPage.tsx                                  |     100 |      100 |     100 |     100 |
 src/routing/routes/SignIn                       |   93.33 |       50 |     100 |   93.33 |
  SignIn.tsx                                     |   93.33 |       50 |     100 |   93.33 | 30
 src/routing/routes/SignIn/SignInView            |     100 |      100 |     100 |     100 |
  SignInView.tsx                                 |     100 |      100 |     100 |     100 |y
 src/routing/routes/SignIn/SignInView/SignInForm |     100 |       75 |     100 |     100 |
  SignInForm.tsx                                 |     100 |       75 |     100 |     100 | 73
  signInFormValidationSchema.ts                  |     100 |      100 |     100 |     100 |
  styles.ts                                      |     100 |      100 |     100 |     100 |
 src/routing/routes/SignUp                       |   94.11 |       75 |     100 |     100 |
  SignUp.tsx                                     |   94.11 |       75 |     100 |     100 | 18
 src/routing/routes/SignUp/SignUpView            |     100 |      100 |     100 |     100 |
  SignUpView.tsx                                 |     100 |      100 |     100 |     100 |
 src/routing/routes/SignUp/SignUpView/SignUpForm |     100 |      100 |     100 |     100 |
  SignUpForm.tsx                                 |     100 |      100 |     100 |     100 |
  formValidationSchema.ts                        |     100 |      100 |     100 |     100 |
  styles.ts                                      |     100 |      100 |     100 |     100 |
 src/routing/routes/VerifyEmail                  |   85.71 |       50 |     100 |   91.66 |
  VerifyEmail.tsx                                |   83.33 |       50 |     100 |    90.9 | 29
  styles.ts                                      |     100 |      100 |     100 |     100 |
 src/themes                                      |     100 |       50 |     100 |     100 |
  defaultTheme.ts                                |     100 |      100 |     100 |     100 |
  palette.ts                                     |     100 |       50 |     100 |     100 | 18
 src/types/enums                                 |       0 |        0 |       0 |       0 |
  Cognito.ts                                     |       0 |        0 |       0 |       0 |
  HubEvent.ts                                    |       0 |        0 |       0 |       0 |
 src/types/useful                                |       0 |        0 |       0 |       0 |
  Nullable.ts                                    |       0 |        0 |       0 |       0 |
  index.ts                                       |       0 |        0 |       0 |       0 |
 src/utils/formDataTestId                        |     100 |      100 |     100 |     100 |
  formDataTestId.ts                              |     100 |      100 |     100 |     100 |
 src/utils/hooks                                 |     100 |      100 |     100 |     100 |
  useQuery.ts                                    |     100 |      100 |     100 |     100 |
 src/utils/validation                            |     100 |    66.66 |     100 |     100 |
  passwordValidation.ts                          |     100 |      100 |     100 |     100 |
  validateMaxStringLength.ts                     |     100 |    66.66 |     100 |     100 | 1
-------------------------------------------------|---------|----------|---------|---------|-------------------
 


# AWS
## Setup AWS for Janush app
## Requirements
### [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

### [CDK](https://www.npmjs.com/package/aws-cdk)

First install [AWS CDK v2](https://www.npmjs.com/package/aws-cdk) 

### Install the AWS CDK
Install the AWS CDK Toolkit globally using the following Node Package Manager command.

npm install -g aws-cdk
### Run the following command to verify correct installation and print the version number of the AWS CDK.

cdk --version

Example output: `` 8.3.1 ``

Command to install **aws-cdk**

`` npm i -g aws-cdk ``

### AWS requries configuration and setup, to do this run following command:
Initially you must configure your workstation with your AWS credentials and an AWS region If you have the AWS CLI installed, the easiest way to satisfy this requirement is issue the following command:


`` aws configure `` (AWS CLI should be installed globally)

Then:

``` npm run cdk bootstrap ```

 And finally 

 ``` npm run cdk deploy ```


 To connect newly generated app, following data need to be update inside 

```
import Amplify, { Auth } from "aws-amplify";

export const AUTH_CONFIG = {
  Auth: {
    identityPoolId: ****************************,
    region: region,
    userPoolId: **************************,
    userPoolWebClientId: **************,
  },
};

export const configureAws = (): void => {
  Amplify.Logger.LOG_LEVEL = "DEBUG";

  try {
    Auth.configure(AUTH_CONFIG);
  } catch (err) {
    console.error(
      "A problem with an authentication configuration occurred:",
      err
    );
  }
};

```

## Get identityPoolId

`` aws cognito-identity list-identity-pools --max-results 20 ``


It will return data with identity pool Id, and identity pool name. **identityPoolId** need to replaced in here  `` identityPoolId: eu-central-1:d6f28bfe-6d09-xxxxxxxxxxxxxxx ``

## Get region

`` aws configure get region `` 

 ![Getting identity id](https://janush-docs.s3.eu-central-1.amazonaws.com/images/get-region.gif)


## Get user pool

User pool can be found under Pool section on AWS portal

![user pool](https://janush-docs.s3.eu-central-1.amazonaws.com/images/user-pool.jpg)

## Get web client pool id

Web client Id is under App Settings inside cognito settings

![user pool](https://janush-docs.s3.eu-central-1.amazonaws.com/images/app-identity.jpg)


More on AWS configuration can be cound in here: [AWS Configuration](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)


## What’s Included?

Your environment will have everything you need to build a modern single-page React app with built-in Identity/AuthN/AuthZ features.





## Contributing

We'd love to have your helping hand on `janush`! See [CONTRIBUTING.md](https://github.com/codeandpepper/janush/blob/main/CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021-2022, [Code & Pepper](https://codeandpepper.com/)