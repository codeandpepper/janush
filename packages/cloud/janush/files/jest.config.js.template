module.exports = {
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@consts/(.*)": "<rootDir>/consts/$1",
    "@enums/(.*)": "<rootDir>/enums/$1",
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!lib/**/*CdkConstruct.ts",
    "!lib/single-environment.ts",
    "!**/enums/*",
    "!bin/**",
    "!cdk.out/**",
    "!scripts/**",
  ],
};
