/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*_spec.ts"],
  testRunner: "jest-jasmine2",
  moduleNameMapper: {
    "@consts(.*)": "<rootDir>/consts/$1",
    "@enums(.*)": "<rootDir>/types/enums/$1",
    "@mocks(.*)": "<rootDir>/mocks/$1",
    "@interfaces(.*)": "<rootDir>/types/interfaces/$1",
    "@janush-schematics(.*)": "<rootDir>/schematics/$1",
    "@utility(.*)": "<rootDir>/schematics/utility/$1",
    "@utils(.*)": "<rootDir>/utils/$1",
  },
  setupFilesAfterEnv: ["./test/setupJestAfterEnv.ts"],
};
