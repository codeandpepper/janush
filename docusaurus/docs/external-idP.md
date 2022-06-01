---
sidebar_position: 2
title: External Identity Providers
---

# External Identity Providers

### Integrate external social identity providers like Facebook, Google or Apple.

Requirements: 
* An active developer account for chosen service:  [Facebook](https://developers.facebook.com/) / [Google](https://developers.google.com/) / [Apple](https://developer.apple.com/)
* Enable any identity providers during create process.
```sh
Do you want add more identity providers? (each provider requires an active developer account).
❯◉ Facebook
 ◉ Google
 ◉ Apple
 ```


## Setup Cloud Environment

1. Go to `app-name/cloud` directory. Rename `.env.example` into `.env` (or create new file) and insert your developer account credentials as following:
```sh
# If Facebook was selected
IDENTITY_PROVIDER_FACEBOOK_CLIENT_ID=1234567890123456
IDENTITY_PROVIDER_FACEBOOK_CLIENT_SECRET=123456789b00def123456a12345678d1

# If Google was selected
IDENTITY_PROVIDER_GOOGLE_CLIENT_ID=123456789012-abc3de23f4erdi6abcdefghi0987m1n1.apps.googleusercontent.com
IDENTITY_PROVIDER_GOOGLE_CLIENT_SECRET=wrtyhy9HdYUIwhfpxPOIU1cb

# If Apple was selected
IDENTITY_PROVIDER_APPLE_CLIENT_ID=com.yourapp.auth
IDENTITY_PROVIDER_APPLE_KEY_ID=123A4B56CD
IDENTITY_PROVIDER_APPLE_PRIVATE_KEY=b3a40a06d1...0ccbaf28e32
IDENTITY_PROVIDER_APPLE_TEAM_ID=1N2ABCWXYZ
```

2. Deploy your app to AWS (remember to first [configure AWS CLI and CDK](https://github.com/codeandpepper/janush#aws)).
```sh
npm run cdk bootstrap #if wasn't bootstraped yet
npm run cdk deploy
```

3. After successful deployment you should see following outputs:
```sh
Outputs:
IdpStack.deveCognitoUserPoolCognitoIdentityPoolExport73C16489 = eu-central-1:eac33b6f-220b-4460-af85-80757e45f905
IdpStack.deveCognitoUserPoolCognitoUserPoolClientIdExport921A1A41 = 2d28oqae8qpamg3bqpqgeajnm8
IdpStack.deveCognitoUserPoolCognitoUserPoolDomainExport964A7B35 = idp-1654092146617.auth.eu-central-1.amazoncognito.com
IdpStack.deveCognitoUserPoolCognitoUserPoolIdExport53180F17 = eu-central-1_zp53N9SNi
```

## Setup External Services

1. Reproduce following steps for selected providers:
* [Register an app with Facebook](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-social-idp.html#cognito-user-pools-social-idp-step-1-facebook)
* [Register an app with Google](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-social-idp.html#cognito-user-pools-social-idp-step-1-google)
* [Register an app with Apple](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-social-idp.html#cognito-user-pools-social-idp-step-1-apple)

## Setup Web Environment

1. Go to `app-name/web` directory. Rename `.env.example` into `.env` (or create new file) and insert values received as output from cloud deployment (or copy the values directly from User Pool management console):
```sh
REACT_APP_IDENTITY_POOL_ID=eu-central-1:eac33b6f-220b-4460-af85-80757e45f905
REACT_APP_REGION=eu-central-1
REACT_APP_USER_POOL_ID=eu-central-1_zp53N9SNi
REACT_APP_USER_POOL_WEB_CLIENT_ID=2d28oqae8qpamg3bqpqgeajnm8
REACT_APP_USER_POOL_DOMAIN=idp-1654092146617.auth.eu-central-1.amazoncognito.com
REACT_APP_USER_POOL_REDIRECT_SIGN_IN=http://localhost:3000/ #change for production
REACT_APP_USER_POOL_REDIRECT_SIGN_OUT=http://localhost:3000/ #change for production
REACT_APP_USER_POOL_RESPONSE_TYPE=code
```

2. Run your web application using `npm start`. You should now be able to sign in using external identity providers.