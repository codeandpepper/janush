import { chain, Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

import { CLIOptions } from "@interfaces/CLIOptions";

import { addCognitoConstructToCloudStack } from "../index";

export const testGenerator = (options: CLIOptions): Rule => {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([addCognitoConstructToCloudStack(options.name as string)]);
  };
};
