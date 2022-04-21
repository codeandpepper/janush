import { FileDoesNotExistException } from "@angular-devkit/core";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

import expectedTemplateFiles from "@janush-schematics/cloud/template/data/expectedNewFiles.json";
import { emptyJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "../../collection.json");

describe("cloud", () => {
  it("should generate all template files properly", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync("cloud.template", { name: "janush-app", modules: [] }, Tree.empty())
      .toPromise();

    expect(tree.files).toHaveEqualElements(expectedTemplateFiles);
  });

  it("should throw not found exception of janush.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let thrownError: FileDoesNotExistException | null = null;
    try {
      await runner
        .runSchematicAsync("cloud.template", { name: "janush-app", modules: [] }, Tree.empty())
        .toPromise();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeDefined();
  });
});
