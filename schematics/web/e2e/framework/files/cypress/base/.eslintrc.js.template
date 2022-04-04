module.exports = {
  root: true,
  extends: ["plugin:cypress/recommended"],
  plugins: ["cypress"],
  env: {
    "cypress/globals": true,
  },
  parser: "@typescript-eslint/parser",
  ignorePatterns: [".eslintrc.js"],
  parserOptions: {
    tsconfigRootDir: "cypress",
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "cypress/no-assigning-return-values": "warn",
    "cypress/no-unnecessary-waiting": "warn",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "warn",
  },
};
