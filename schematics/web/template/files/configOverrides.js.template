const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "@components": path.resolve(__dirname, "src/components"),
      "@consts": path.resolve(__dirname, "src/consts"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@janush-types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@features": path.resolve(__dirname, "src/features"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@routing": path.resolve(__dirname, "src/routing"),
      "@themes": path.resolve(__dirname, "src/themes"),
    },
  };
  return config;
};

module.exports.jest = (config) => {
  config.transformIgnorePatterns = [
    ",/node_modules/(?!@hookform/*).+\\.[t|j]sx?$",
  ];
  config.collectCoverageFrom = [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/features/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.generated.{ts,tsx}",
    "!src/**/*State.ts",
    "!src/awsConfig.ts",
    "!src/reportWebVitals.ts",
    "!src/index.tsx",
    "!src/reactAppEnv.d.ts",
    "!src/**/index.ts.template",
  ];
  config.testTimeout = 15_000;
  return config;
};
