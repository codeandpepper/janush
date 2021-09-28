import {
  NodeDependency,
  NodeDependencyType,
} from "@schematics/angular/utility/dependencies";

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
