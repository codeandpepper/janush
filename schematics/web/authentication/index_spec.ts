import * as path from "path";
import { FileDoesNotExistException } from "@angular-devkit/core";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";

import { emptyJanush } from "@mocks/janush";
import expectedAuthFiles from "@janush-schematics/web/authentication/data/expected-new-files.json";
import expectedJanushFiles from "@janush-schematics/web/janush/data/expected-new-files.json";
import expectedTemplateFiles from "@janush-schematics/web/template/data/expected-new-files.json";
import * as janush from "@utility/janush-json";

const collectionPath = path.join(__dirname, "../../collection.json");

describe("web", () => {
  it("should create auth files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        "web",
        { name: "janush-app", modules: ["authentication"], e2e: false },
        Tree.empty()
      )
      .toPromise();

    expect(tree.files).toHaveEqualElements([
      ...expectedTemplateFiles,
      ...expectedJanushFiles,
      ...expectedAuthFiles,
    ]);
  });

  it("should not create auth files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        "web",
        /* Auth module is set in schema.json by default, so [] overwrites it */
        { name: "janush-app", modules: [] },
        Tree.empty()
      )
      .toPromise();

    expect(tree.files).not.toIncludeSome(expectedAuthFiles);
  });

  it("should throw not found exception of janush.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let thrownError: FileDoesNotExistException | null = null;
    try {
      await runner
        .runSchematicAsync(
          "web",
          { name: "janush-app", e2e: false },
          Tree.empty()
        )
        .toPromise();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeDefined();
  });
});
