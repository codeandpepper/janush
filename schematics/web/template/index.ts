import { strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  schematic,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";

import { Schematic, WebE2ESchematic, WebSchematic } from "@enums/Schematic";
import { getCurrentWorkingDirectory } from "@janush-schematics/utility/directoryUtils";
import { readJanushJSON } from "@utility/janushJson";
import { installDependencies } from "@utility/scripts";

import { Schema } from "./schema";

export const webTemplateGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);
    const name = strings.dasherize(janushFile.name);
    const workingDirectory = getCurrentWorkingDirectory().includes(name)
      ? Schematic.WEB
      : `${name}/${Schematic.WEB}`;

    if (!options.skipInstall) {
      _context.addTask(installDependencies(workingDirectory), []);
    }

    return chain([
      mergeWith(
        apply(url("./files"), [
          applyTemplates({
            ...options,
            ...strings,
          }),
          move(Schematic.WEB),
        ]),
        MergeStrategy.Overwrite,
      ),
      schematic(WebSchematic.JANUSH, options),
      schematic(WebE2ESchematic.PROMPT, options),
      schematic("applyPrettier", {}),
    ]);
  };
};
