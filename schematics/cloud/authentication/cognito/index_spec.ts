import * as path from "path";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { Tree } from "@angular-devkit/schematics";

import { emptyJanush, moduleJanush } from "@mocks/janush";
import { Schematic } from "@enums/Schematic";
import expectedJanushTemplateFiles from "@janush-schematics/cloud/janush/data/expected-files.json";
import expectedAuthenticationEmailsTemplateFiles from "@janush-schematics/cloud/authentication/emails/data/expected-files.json";
import expectedAuthenticationTemplateFiles from "@janush-schematics/cloud/authentication/cognito/data/expected-files.json";
import * as janush from "@utility/janush-json";

const collectionPath = path.join(__dirname, "../../../collection.json");

describe("cloud.authentication", () => {
  it("should generate authentication without janush template and emails", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(emptyJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: [] },
        Tree.empty()
      )
      .toPromise();

    const authenticationTree = await runner
      .runSchematicAsync(
        "cloud.authentication",
        { emails: false },
        templateTree
      )
      .toPromise();

    expect(authenticationTree.files).toHaveSameElements([
      ...expectedJanushTemplateFiles,
      ...expectedAuthenticationTemplateFiles,
    ]);
  });

  it("should generate authentication with janush template and emails", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authentication"] },
        Tree.empty()
      )
      .toPromise();

    expect(templateTree.files).toHaveSameElements([
      ...expectedJanushTemplateFiles,
      ...expectedAuthenticationTemplateFiles,
      ...expectedAuthenticationEmailsTemplateFiles,
    ]);
  });

  it("should generate authentication with janush template and without emails", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authentication"], emails: false },
        Tree.empty()
      )
      .toPromise();

    expect(templateTree.files).toHaveSameElements([
      ...expectedJanushTemplateFiles,
      ...expectedAuthenticationTemplateFiles,
    ]);
  });

  it("should check inserted construct to stack", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const importStatement = `import { CognitoCdkConstruct } from './authentication/cognitoCdkConstruct'`;

    const cognitoConstructStatement = "new CognitoCdkConstruct";

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authentication"] },
        Tree.empty()
      )
      .toPromise();

    const cloudStackFile = templateTree.readContent(
      `${Schematic.CLOUD}/lib/janush-app-stack.ts`
    );

    expect(cloudStackFile).toContain(importStatement);

    expect(cloudStackFile).toContain(cognitoConstructStatement);
  });
});
