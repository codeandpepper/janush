import { FileDoesNotExistException } from "@angular-devkit/core";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

import expectedAuthenticationFiles from "@janush-schematics/web/authentication/data/expectedNewFiles.json";
import expectedWebUserManagementFiles from "@janush-schematics/web/authentication/userManagement/data/expectedNewFiles.json";
import expectedJanushFiles from "@janush-schematics/web/janush/data/expectedNewFiles.json";
import expectedTemplateFiles from "@janush-schematics/web/template/data/expectedNewFiles.json";
import { emptyJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "../../collection.json");

describe("web", () => {
  it("should generate all files properly", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync("web", { name: "janush-app", e2e: false }, Tree.empty())
      .toPromise();

    expect(tree.files).toHaveEqualElements([
      ...expectedTemplateFiles,
      ...expectedJanushFiles,
      ...expectedAuthenticationFiles,
      ...expectedWebUserManagementFiles,
    ]);
  });

  it("should throw not found exception of janush.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let thrownError: FileDoesNotExistException | null = null;
    try {
      await runner
        .runSchematicAsync("web", { name: "janush-app", e2e: false }, Tree.empty())
        .toPromise();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeDefined();
  });
});
