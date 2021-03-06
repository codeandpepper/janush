import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";
import * as prettier from "prettier";

import { Schematic } from "@enums/Schematic";
import expectedAuthenticationTemplateFiles from "@janush-schematics/cloud/authentication/cognito/data/expectedNewFiles.json";
import expectedAuthenticationEmailsTemplateFiles from "@janush-schematics/cloud/authentication/emails/data/expectedNewFiles.json";
import expectedJanushFiles from "@janush-schematics/cloud/janush/data/expectedNewFiles.json";
import expectedTemplateFiles from "@janush-schematics/cloud/template/data/expectedNewFiles.json";
import { emptyJanush, moduleJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "../../../collection.json");

describe("cloud.authentication", () => {
  it("should generate authentication without janush template and emails", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const templateTree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: [] }, Tree.empty())
      .toPromise();

    const authenticationTree = await runner
      .runSchematicAsync("cloud.authentication", { emails: false }, templateTree)
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
      .runSchematicAsync("cloud", { name: "janush-app", modules: ["authentication"] }, Tree.empty())
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
      .runSchematicAsync("cloud", { name: "janush-app", modules: [] }, Tree.empty())
      .toPromise();

    expect(templateTree.files).not.toIncludeSome(expectedAuthenticationTemplateFiles);
  });

  it("should generate authentication with janush template and without emails", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authentication"], emails: false },
        Tree.empty(),
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
      .runSchematicAsync("cloud", { name: "janush-app", modules: ["authentication"] }, Tree.empty())
      .toPromise();

    const cloudStackFile = templateTree.readContent(`${Schematic.CLOUD}/lib/janush-app-stack.ts`);

    expect(cloudStackFile).toContain(
      prettier.format(importStatement, {
        parser: "babel-ts",
      }),
    );
    expect(cloudStackFile).toContain(cognitoConstructStatement);
  });
});
