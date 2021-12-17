import * as path from "path";
import { FileDoesNotExistException } from "@angular-devkit/core";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";

import * as janush from "@utility/janush-json";
import expectedTemplateFiles from "@janush-schematics/web/template/data/expected-new-files.json";
import expectedJanushFiles from "@janush-schematics/web/janush/data/expected-new-files.json";
import { emptyJanush } from "@mocks/janush";

const collectionPath = path.join(__dirname, "../../collection.json");

describe("web", () => {
  it("should create files for: [template, janush]", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        "web",
        {
          name: "janush-app",
          modules: ["random-module-so-janush-make-sense-to-exist"],
        },
        Tree.empty()
      )
      .toPromise();

    expect(tree.files).toHaveEqualElements([
      ...expectedTemplateFiles,
      ...expectedJanushFiles,
    ]);
  });

  it("should not create janush files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        "web",
        {
          name: "janush-app",
          modules: [],
        },
        Tree.empty()
      )
      .toPromise();

    expect(tree.files).not.toIncludeSome(expectedJanushFiles);
  });

  it("should throw not found exception of janush.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let thrownError: FileDoesNotExistException | null = null;
    try {
      await runner
        .runSchematicAsync("web", { name: "janush-app" }, Tree.empty())
        .toPromise();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeDefined();
  });
});
