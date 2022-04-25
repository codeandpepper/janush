import { Auth, Logger } from "aws-amplify";

export const AUTH_CONFIG = {
  Auth: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  },
};

export const configureAws = (): void => {
  Logger.LOG_LEVEL = "DEBUG";

  try {
    Auth.configure(AUTH_CONFIG);
  } catch (err) {
    console.error(
      "A problem with an authentication configuration occurred:",
      err
    );
  }
};
