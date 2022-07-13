import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import path from "path";

import expectedJanushFiles from "@janush-schematics/cloud/janush/data/expectedNewFiles.json";
import expectedTemplateFiles from "@janush-schematics/cloud/template/data/expectedNewFiles.json";
import expectedCreateUsersManagementFiles from "@janush-schematics/cloud/usersManagement/createUserGroup/data/expectedNewFiles.json";
import expectedGetUsersManagementFiles from "@janush-schematics/cloud/usersManagement/getUserGroups/data/expectedNewFiles.json";
import { moduleJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "../../collection.json");

describe("cloud.usersManagement", () => {
  let runner: SchematicTestRunner;
  beforeEach(() => {
    runner = new SchematicTestRunner("schematics", collectionPath);
    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();
  });

  it("should generate only users management module", async () => {
    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["usersManagement"] },
        Tree.empty(),
      )
      .toPromise();

    expect(templateTree.files).toHaveEqualElements([
      ...expectedJanushFiles,
      ...expectedTemplateFiles,
      ...expectedCreateUsersManagementFiles,
      ...expectedGetUsersManagementFiles,
    ]);
  });

  it("should not generate users management module when not selected", async () => {
    const templateTree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: [] }, Tree.empty())
      .toPromise();

    expect(templateTree.files).not.toContain([...expectedCreateUsersManagementFiles]);
  });
});
