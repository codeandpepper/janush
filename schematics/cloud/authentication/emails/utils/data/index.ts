import { chain, Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

import { CLIOptions } from "@interfaces/CLIOptions";
import { addEmailsConstructToCognitoConstruct } from "../index";

export const testGenerator = (_options: CLIOptions): Rule => {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([addEmailsConstructToCognitoConstruct()]);
  };
};
