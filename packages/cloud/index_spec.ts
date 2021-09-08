import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

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
  it("works", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync("cloud", { name: "janush-app" }, Tree.empty())
      .toPromise();

    expect(tree.files).toEqual(expectedFiles);
  });
});
