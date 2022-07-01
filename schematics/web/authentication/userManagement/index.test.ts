import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

import { Module } from "@enums/Module";
import { Schematic } from "@enums/Schematic";
import expectedWebUserManagementFiles from "@janush-schematics/web/authentication/userManagement/data/expectedNewFiles.json";
import { emptyJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "../../../collection.json");

describe("userManagement", () => {
  it("should create all user management files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        Schematic.WEB,
        {
          name: "janush-app",
          modules: [Module.AUTHENTICATION],
          userManagement: true,
          e2e: false,
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toIncludeEvery(expectedWebUserManagementFiles);
  });

  it("shouldn't create any user management files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        Schematic.WEB,
        {
          name: "janush-app",
          modules: [Module.AUTHENTICATION],
          userManagement: false,
          e2e: false,
        },
        Tree.empty(),
      )
      .toPromise();

    // we want to create this 2 files
    expect(tree.files).not.toIncludeSome(
      expectedWebUserManagementFiles.filter(
        (item) => item !== "/web/src/routing/Routes.tsx" && item !== "/web/src/routing/paths.ts",
      ),
    );
  });
});
