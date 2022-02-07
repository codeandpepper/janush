import { strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  schematic,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";

import { Module } from "@enums/Module";
import { Schematic, WebE2ESchematic, WebSchematic } from "@enums/Schematic";
import { readJanushJSON, updateJanushJSON } from "@utility/janush-json";
import { installDependencies } from "@utility/scripts";

import { Schema } from "./schema";

const isEmptyModules = (options: Schema) => options.modules.length === 0;

export const webTemplateGenerator = (options: Schema): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    const janushFile = readJanushJSON(tree);

    const name = strings.dasherize(janushFile.name);

    const workingDirectory = `${name}/${Schematic.WEB}`;

    if (!options.skipInstall) {
      _context.addTask(installDependencies(workingDirectory), []);
    }

    const isAuth = options.modules.includes(Module.AUTHENTICATION);

    if (!isEmptyModules(options)) {
      janushFile.web.module[Module.AUTHENTICATION] = isAuth;
      updateJanushJSON(tree, janushFile);
    }

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
        MergeStrategy.Overwrite
      ),
      schematic(WebSchematic.JANUSH, {
        name: options.name,
      }),
      isAuth ? schematic(WebSchematic.AUTHENTICATION, options) : noop(),
      schematic(WebE2ESchematic.PROMPT, options),
      schematic("apply-prettier", {}),
    ]);
  };
};
