import {
  NodeDependency,
  NodeDependencyType,
} from "@schematics/angular/utility/dependencies";

const lodash = {
  type: NodeDependencyType.Default,
  name: "lodash",
  version: "^4.17.21",
};
const lodashTypes = {
  type: NodeDependencyType.Dev,
  name: "@types/lodash",
  version: "^4.14.177",
};

export const janushTemplateNodeDependencies: NodeDependency[] = [
  {
    type: NodeDependencyType.Dev,
    name: "@typescript-eslint/eslint-plugin",
    version: "^4.29.2",
  },
  {
    type: NodeDependencyType.Dev,
    name: "@typescript-eslint/parser",
    version: "^4.29.2",
  },
  {
    type: NodeDependencyType.Dev,
    name: "eslint",
    version: "^7.25.0",
  },
  {
    type: NodeDependencyType.Dev,
    name: "eslint-config-prettier",
    version: "^8.3.0",
  },
  {
    type: NodeDependencyType.Dev,
    name: "eslint-plugin-prettier",
    version: "^3.4.0",
  },
  {
    type: NodeDependencyType.Dev,
    name: "prettier",
    version: "^2.2.1",
  },
  {
    type: NodeDependencyType.Dev,
    name: "tsconfig-paths",
    version: "^3.9.0",
  },
  {
    type: NodeDependencyType.Dev,
    name: "typescript",
    version: "^4.2.4",
  },
  {
    type: NodeDependencyType.Dev,
    name: "esbuild",
    version: "^0.13.2",
  },
];

export const authenticationEmailsNodeDependencies: NodeDependency[] = [
  {
    type: NodeDependencyType.Dev,
    name: "mjml",
    version: "^4.9.3",
  },
  {
    type: NodeDependencyType.Dev,
    name: "@types/aws-lambda",
    version: "^8.10.83",
  },
  {
    type: NodeDependencyType.Default,
    name: "aws-sdk",
    version: "2.995.0",
    overwrite: true,
  },
];

export const webJanushAuthenticationNodeDependencies: NodeDependency[] = [
  {
    type: NodeDependencyType.Default,
    name: "@hookform/resolvers",
    version: "^2.8.1",
  },
  {
    type: NodeDependencyType.Default,
    name: "aws-amplify",
    version: "^4.2.10",
  },
  {
    type: NodeDependencyType.Default,
    name: "aws-amplify",
    version: "^4.2.10",
  },
  lodash,
  lodashTypes,
  {
    type: NodeDependencyType.Default,
    name: "react-helmet",
    version: "^6.1.0",
  },
  {
    type: NodeDependencyType.Default,
    name: "react-hook-form",
    version: "^7.15.4",
  },
  {
    type: NodeDependencyType.Default,
    name: "yup",
    version: "^0.32.9",
  },
  {
    type: NodeDependencyType.Dev,
    name: "@types/react-helmet",
    version: "^6.1.2",
  },
];

export const e2eCypressDependencies: NodeDependency[] = [
  {
    type: NodeDependencyType.Dev,
    name: "cypress",
    version: "^9.2.0",
  },
];
