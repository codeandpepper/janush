import * as path from "path";
import { FileDoesNotExistException } from "@angular-devkit/core";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";

import { moduleJanush } from "@mocks/janush";
import expectedJanushTemplateFiles from "@janush-schematics/cloud/janush/data/expected-files.json";
import * as janush from "@utility/janush-json";

const collectionPath = path.join(__dirname, "../../collection.json");

describe("cloud.janush", () => {
  it("should generate all janush files properly", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

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

    expect(tree.files).toEqual(expectedJanushTemplateFiles);
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
