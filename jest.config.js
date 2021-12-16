/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  maxWorkers: 3,
  testEnvironment: "node",
  testMatch: ["**/*_spec.ts"],
  moduleNameMapper: {
    "@consts(.*)": "<rootDir>/consts/$1",
    "@enums(.*)": "<rootDir>/types/enums/$1",
    "@mocks(.*)": "<rootDir>/mocks/$1",
    "@interfaces(.*)": "<rootDir>/types/interfaces/$1",
    "@janush-schematics(.*)": "<rootDir>/schematics/$1",
    "@utility(.*)": "<rootDir>/schematics/utility/$1",
    "@utils(.*)": "<rootDir>/utils/$1",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  setupFilesAfterEnv: ["./test/setupJestAfterEnv.ts"],
};
