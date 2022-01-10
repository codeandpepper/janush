declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_IDENTITY_POOL_ID: string;
      REACT_APP_REGION: string;
      REACT_APP_USER_POOL_ID: string;
      REACT_APP_USER_POOL_WEB_CLIENT_ID: string;
    }
  }
}

export {};
