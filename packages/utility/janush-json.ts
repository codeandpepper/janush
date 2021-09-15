import { Tree } from "@angular-devkit/schematics";
import { FileDoesNotExistException } from "@angular-devkit/core";

import { JANUSH_JSON_PATH } from "@consts/index";
import { Janush } from "@interfaces/Janush";

export const readJanushJSON = (tree: Tree, path: string = JANUSH_JSON_PATH): Janush => {
  try {
    const janushFile = tree.read(path);

    if (!janushFile) {
      throw new Error();
    }
    return JSON.parse(janushFile.toString()) as Janush;
  } catch {
    throw new FileDoesNotExistException(JANUSH_JSON_PATH);
  }
};

export const updateJanushJSON = (tree: Tree, values: Janush): void => {
  try {
    tree.overwrite(JANUSH_JSON_PATH, JSON.stringify(values));
  } catch {
    throw new FileDoesNotExistException(JANUSH_JSON_PATH);
  }
};
