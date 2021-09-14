import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { FileDoesNotExistException } from "@angular-devkit/core";
import * as path from "path";

import * as janush from "../../utility/janush-json";
import { emptyJanush, moduleJanush } from "../../../mocks/janush";

const collectionPath = path.join(__dirname, "../collection.json");

export const expectedTemplateFiles = [
  "/cloud/.gitignore",
  "/cloud/.npmignore",
  "/cloud/README.md",
  "/cloud/cdk.json",
  "/cloud/jest.config.js",
  "/cloud/package.json",
  "/cloud/tsconfig.json",
  "/cloud/bin/janush-app.ts",
  "/cloud/lib/janush-app-stack.ts",
  "/cloud/test/janush-app.test.ts",
];

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
];

describe("cloud", () => {
  it("should generate all template files properly", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(emptyJanush);
    spyOn(janush, "updateJanushJSON");

    const tree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: [] }, Tree.empty())
      .toPromise();

    expect(tree.files).toEqual(expectedTemplateFiles);
  });

  it("should generate all janush files properly", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

    const tree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: ["authorization"] }, Tree.empty())
      .toPromise();

    expect(tree.files).toEqual(expectedJanushTemplateFiles);
  });

  it("should throw not found exception of janush.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let thrownError: FileDoesNotExistException | null = null;
    try {
      await runner
        .runSchematicAsync("web", { name: "janush-app", modules: [] }, Tree.empty())
        .toPromise();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeDefined();
  });
});
