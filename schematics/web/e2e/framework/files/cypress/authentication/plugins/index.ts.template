// @ts-ignore
import codeCoverageTask from "@cypress/code-coverage/task";
import dotenv from "dotenv";

dotenv.config();

export default (on: any, config: any) => {
  config = codeCoverageTask(on, config);
  config.env = {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  };
  return config;
};
