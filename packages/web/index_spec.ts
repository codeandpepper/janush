import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { FileDoesNotExistException } from "@angular-devkit/core";
import * as path from "path";
import * as janush from "../../utils/janush";

const collectionPath = path.join(__dirname, "../collection.json");

export const expectedFiles = [
  "/web/.gitignore",
  "/web/README.md",
  "/web/package.json",
  "/web/tsconfig.json",
  "/web/public/favicon.ico",
  "/web/public/index.html",
  "/web/public/logo192.png",
  "/web/public/logo512.png",
  "/web/public/manifest.json",
  "/web/public/robots.txt",
  "/web/src/App.css",
  "/web/src/App.test.tsx",
  "/web/src/App.tsx",
  "/web/src/index.css",
  "/web/src/index.tsx",
  "/web/src/logo.svg",
  "/web/src/react-app-env.d.ts",
  "/web/src/reportWebVitals.ts",
  "/web/src/setupTests.ts",
];

describe("web", () => {
  it("should generate all files properly", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue({ name: "janush-app" });
    spyOn(janush, "updateJanushJSON");

    const tree = await runner
      .runSchematicAsync("web", { name: "janush-app" }, Tree.empty())
      .toPromise();

    expect(tree.files).toEqual(jasmine.arrayContaining(expectedFiles));
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
