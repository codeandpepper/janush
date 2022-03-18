import * as path from "path";
import { FileDoesNotExistException } from "@angular-devkit/core";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";

import { emptyJanush } from "@mocks/janush";
import expectedTemplateFiles from "@janush-schematics/cloud/template/data/expected-new-files.json";
import * as janush from "@utility/janush-json";

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
