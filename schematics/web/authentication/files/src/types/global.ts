export interface IProcessEnv {
  REACT_APP_IDENTITY_POOL_ID: string;
  REACT_APP_REGION: string;
  REACT_APP_USER_POOL_ID: string;
  REACT_APP_USER_POOL_WEB_CLIENT_ID: string;
  REACT_APP_USER_POOL_DOMAIN: string;
  REACT_APP_USER_POOL_REDIRECT_SIGN_IN?: string;
  REACT_APP_USER_POOL_REDIRECT_SIGN_OUT?: string;
  REACT_APP_USER_POOL_RESPONSE_TYPE?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends IProcessEnv {}
  }
}

export {};
