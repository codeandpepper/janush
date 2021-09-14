import { NodeDependency, NodeDependencyType } from "@schematics/angular/utility/dependencies";

export const JanushTemplateNodeDependencies: NodeDependency[] = [
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
];

export const AuthorizationNodeDependencies: NodeDependency[] = [];
