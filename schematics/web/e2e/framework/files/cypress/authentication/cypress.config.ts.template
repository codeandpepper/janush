import { defineConfig } from "cypress";
import dotenv from "dotenv";
// @ts-ignore
import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  defaultCommandTimeout: 12000,
  requestTimeout: 20000,
  responseTimeout: 20000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  scrollBehavior: "center",
  chromeWebSecurity: false,
  watchForFileChanges: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome/single-specs",
    reportFilename: "spec",
    html: false,
    json: true,
    timestamp: "dd-mm-yyyy_HH-MM-ss",
  },
  e2e: {
    setupNodeEvents(on, config) {
      dotenv.config({ path: "../.env" });
      config = codeCoverageTask(on, config);
      config.env = {
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      };
      return config;
    },
    baseUrl: "http://localhost:3000",
  },
});
