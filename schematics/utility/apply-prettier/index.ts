import { Rule, Tree } from "@angular-devkit/schematics";
import * as prettier from "prettier";

export const applyPrettierUtility = (): Rule => {
  return (tree: Tree) => {
    tree.visit((path) => {
      const pathList = path.split("/");

      if (
        !pathList.includes("node_modules") &&
        (path.endsWith(".tsx") || path.endsWith(".ts"))
      ) {
        const content = tree.read(path);
        if (content) {
          const formatted = prettier.format(content.toString("utf-8"), {
            parser: "babel-ts",
          });
          tree.overwrite(path, formatted);
        }
      }

      return false;
    });
  };
};
