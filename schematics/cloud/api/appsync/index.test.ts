import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import path from "path";
import * as prettier from "prettier";

import { Schematic } from "@enums/Schematic";
import expectedAppSyncTemplateFiles from "@janush-schematics/cloud/api/appsync/data/expectedNewFiles.json";
import expectedAuthenticationTemplateFiles from "@janush-schematics/cloud/authentication/cognito/data/expectedNewFiles.json";
import expectedAuthenticationEmailsTemplateFiles from "@janush-schematics/cloud/authentication/emails/data/expectedNewFiles.json";
import expectedJanushFiles from "@janush-schematics/cloud/janush/data/expectedNewFiles.json";
import expectedTemplateFiles from "@janush-schematics/cloud/template/data/expectedNewFiles.json";
import { moduleJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "../../../collection.json");

describe("cloud.api", () => {
  beforeEach(() => {
    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();
  });

  it("should create files for: [template, janush, api, authentication, emails]", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authentication", "api"] },
        Tree.empty(),
      )
      .toPromise();

    expect(templateTree.files).toHaveEqualElements([
      ...expectedTemplateFiles,
      ...expectedJanushFiles,
      ...expectedAppSyncTemplateFiles,
      ...expectedAuthenticationTemplateFiles,
      ...expectedAuthenticationEmailsTemplateFiles,
    ]);
  });

  it("should not create files for appsync", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const templateTree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: [] }, Tree.empty())
      .toPromise();

    expect(templateTree.files).not.toIncludeSome(expectedAppSyncTemplateFiles);
  });

  it("should check inserted AppSync construct to stack", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const importStatement = `import { AppSyncCdkConstruct } from './api/appSyncCdkConstruct'`;

    const appSyncConstructStatement = "new AppSyncCdkConstruct";

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authentication", "api"] },
        Tree.empty(),
      )
      .toPromise();

    const cloudStackFile = templateTree.readContent(`${Schematic.CLOUD}/lib/janush-app-stack.ts`);

    expect(cloudStackFile).toContain(
      prettier.format(importStatement, {
        parser: "babel-ts",
      }),
    );
    expect(cloudStackFile).toContain(appSyncConstructStatement);
  });
});
