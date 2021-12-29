import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from "@angular-devkit/schematics";

import { addEmailsConstructToCognitoConstruct } from "../index";

export const testGenerator = (_options: any): Rule => {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([addEmailsConstructToCognitoConstruct()]);
  };
};
