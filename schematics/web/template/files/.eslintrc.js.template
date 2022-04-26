module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "@typescript-eslint", "jest", "import"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  ignorePatterns: [".eslintrc.js"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "import/no-extraneous-dependencies": ["warn"],
    "jest/expect-expect": "off",
    "linebreak-style": "off",
    "no-param-reassign": "off",
    "no-duplicate-imports": "error",
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "react/require-default-props": "off",
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-non-null-assertion": 0,
  },
};