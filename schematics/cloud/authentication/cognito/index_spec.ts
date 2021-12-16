import * as path from "path";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { Tree } from "@angular-devkit/schematics";

import { Schematic } from "@enums/Schematic";
import { emptyJanush, moduleJanush } from "@mocks/janush";
import expectedTemplateFiles from "@janush-schematics/cloud/template/data/expected-new-files.json";
import expectedJanushFiles from "@janush-schematics/cloud/janush/data/expected-new-files.json";
import expectedAuthenticationEmailsTemplateFiles from "@janush-schematics/cloud/authentication/emails/data/expected-new-files.json";
import expectedAuthenticationTemplateFiles from "@janush-schematics/cloud/authentication/cognito/data/expected-new-files.json";
import * as janush from "@utility/janush-json";

const collectionPath = path.join(__dirname, "../../../collection.json");

describe("cloud.authentication", () => {
  it("should generate authentication without janush template and emails", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

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

    expect(authenticationTree.files).toHaveEqualElements([
      ...expectedTemplateFiles,
      ...expectedJanushFiles,
      ...expectedAuthenticationTemplateFiles,
    ]);
  });

  it("should create files for: [template, janush, authentication, emails]", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authentication"] },
        Tree.empty()
      )
      .toPromise();

    expect(templateTree.files).toHaveEqualElements([
      ...expectedTemplateFiles,
      ...expectedJanushFiles,
      ...expectedAuthenticationTemplateFiles,
      ...expectedAuthenticationEmailsTemplateFiles,
    ]);
  });

  it("should not create files for authentication", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: [] },
        Tree.empty()
      )
      .toPromise();

    expect(templateTree.files).not.toIncludeSome(
      expectedAuthenticationTemplateFiles
    );
  });

  it("should generate authentication with janush template and without emails", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authentication"], emails: false },
        Tree.empty()
      )
      .toPromise();

    expect(templateTree.files).toHaveEqualElements([
      ...expectedTemplateFiles,
      ...expectedJanushFiles,
      ...expectedAuthenticationTemplateFiles,
    ]);
  });

  it("should check inserted construct to stack", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const importStatement = `import { CognitoCdkConstruct } from './authentication/cognitoCdkConstruct'`;

    const cognitoConstructStatement = "new CognitoCdkConstruct";

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

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
