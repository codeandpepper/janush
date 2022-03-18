import { Tree } from "@angular-devkit/schematics";
import mergeWith from "lodash.mergewith";

function customizer(objValue: object, srcValue: object) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export const mergeJsonFile = (
  tree: Tree,
  path: string,
  newObj: object
): Tree => {
  const fileContent = tree.read(path);

  if (!fileContent) {
    throw new Error(`${path} not found.`);
  }

  const originalObj = JSON.parse(fileContent.toString());

  const newPackageJson = JSON.stringify(
    mergeWith(originalObj, newObj, customizer),
    null,
    2
  );

  tree.overwrite(path, newPackageJson);

  return tree;
};
