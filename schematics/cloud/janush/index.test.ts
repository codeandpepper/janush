import * as path from "path";
import { FileDoesNotExistException } from "@angular-devkit/core";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";

import { moduleJanush } from "@mocks/janush";
import expectedJanushFiles from "@janush-schematics/cloud/janush/data/expectedNewFiles.json";
import expectedTemplateFiles from "@janush-schematics/cloud/template/data/expectedNewFiles.json";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "../../collection.json");

describe("cloud.janush", () => {
  it("should create files for: [template, janush]", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: [] },
        Tree.empty()
      )
      .toPromise();

    const tree = await runner
      .runSchematicAsync("cloud.janush", {}, templateTree)
      .toPromise();

    expect(tree.files).toHaveEqualElements([
      ...expectedTemplateFiles,
      ...expectedJanushFiles,
    ]);
  });

  it("should throw not found exception of janush.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let thrownError: FileDoesNotExistException | null = null;
    try {
      await runner
        .runSchematicAsync(
          "cloud.janush",
          { name: "janush-app", modules: [] },
          Tree.empty()
        )
        .toPromise();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeDefined();
  });
});
