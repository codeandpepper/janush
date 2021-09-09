import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { FileDoesNotExistException } from "@angular-devkit/core";
import * as path from "path";

import * as janush from "../../utils/janush";

const collectionPath = path.join(__dirname, "../collection.json");

export const expectedFiles = [
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

describe("cloud", () => {
  it("should generate all files properly", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue({ name: "janush-app" });
    spyOn(janush, "updateJanushJSON");

    const tree = await runner
      .runSchematicAsync("cloud", { name: "janush-app" }, Tree.empty())
      .toPromise();

    expect(tree.files).toEqual(expectedFiles);
  });

  it("should throw not found exception of janush.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let thrownError: FileDoesNotExistException | null = null;
    try {
      await runner.runSchematicAsync("web", { name: "janush-app" }, Tree.empty()).toPromise();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeDefined();
  });
});
