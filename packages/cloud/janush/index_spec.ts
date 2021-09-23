import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { Tree } from "@angular-devkit/schematics";
import * as path from "path";

import * as janush from "@utility/janush-json";
import { moduleJanush } from "../../../mocks/janush";
import { FileDoesNotExistException } from "@angular-devkit/core";

const collectionPath = path.join(__dirname, "../collection.json");

export const expectedJanushTemplateFiles = [
  "/cloud/.gitignore",
  "/cloud/.npmignore",
  "/cloud/README.md",
  "/cloud/cdk.json",
  "/cloud/jest.config.js",
  "/cloud/package.json",
  "/cloud/tsconfig.json",
  "/cloud/.eslintrc.js",
  "/cloud/.prettierrc.json",
  "/cloud/bin/janush-app.ts",
  "/cloud/lib/janush-app-stack.ts",
  "/cloud/test/janush-app.test.ts",
  "/cloud/consts/index.ts",
  "/cloud/enums/EnvName.ts",
  "/cloud/scripts/test.txt",
  "/cloud/utils/functions.ts",
];

describe("cloud.janush", () => {
  it("should generate all janush files properly", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: [] }, Tree.empty())
      .toPromise();

    console.log(templateTree.files);

    const tree = await runner.runSchematicAsync("cloud.janush", {}, templateTree).toPromise();

    console.log(templateTree.files);
    console.log(tree.files);

    expect(tree.files).toEqual(expectedJanushTemplateFiles);
  });

  it("should throw not found exception of janush.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let thrownError: FileDoesNotExistException | null = null;
    try {
      await runner
        .runSchematicAsync("cloud.janush", { name: "janush-app", modules: [] }, Tree.empty())
        .toPromise();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeDefined();
  });
});
