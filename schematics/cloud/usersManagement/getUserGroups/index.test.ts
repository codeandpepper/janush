import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import path from "path";
import * as prettier from "prettier";

import { Schematic } from "@enums/Schematic";
import { moduleJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "../../../collection.json");

describe("cloud.usersManagement.getUserGroups", () => {
  let runner: SchematicTestRunner;
  beforeEach(() => {
    runner = new SchematicTestRunner("schematics", collectionPath);
    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();
  });

  it("should check inserted GetUserGroupsConstruct to stack", async () => {
    const importStatement = `import { GetUserGroupsCdkConstruct } from './usersManagement/getUserGroups/getUserGroupsCdkConstruct'`;

    const usersManagementConstructStatement = "new GetUserGroupsCdkConstruct";

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["usersManagement"] },
        Tree.empty(),
      )
      .toPromise();

    const cloudStackFile = templateTree.readContent(`${Schematic.CLOUD}/lib/janush-app-stack.ts`);

    expect(cloudStackFile).toContain(
      prettier.format(importStatement, {
        parser: "babel-ts",
      }),
    );
    expect(cloudStackFile).toContain(usersManagementConstructStatement);
  });
});
