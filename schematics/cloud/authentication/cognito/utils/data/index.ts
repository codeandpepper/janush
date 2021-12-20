import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from "@angular-devkit/schematics";

import { addCognitoConstructToCloudStack } from "../index";

export const testGenerator = (options: any): Rule => {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([addCognitoConstructToCloudStack(options.name)]);
  };
};
