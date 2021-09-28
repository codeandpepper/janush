import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { Tree } from "@angular-devkit/schematics";
import * as path from "path";
import * as janush from "@utility/janush-json";
import * as fs from "fs";

import { expectedJanushTemplateFiles } from "@schematics/cloud/janush/index_spec";

import { emptyJanush, moduleJanush } from "@mocks/janush";
import { Schematic } from "@enums/Schematic";
import { expectedAuthenticationEmailsTemplateFiles } from "@schematics/cloud/authentication/emails/index_spec";

const collectionPath = path.join(__dirname, "../../../collection.json");

export const expectedAuthenticationTemplateFiles = [
  "/cloud/lib/authentication/cognitoCdkConstruct.ts",
  "/cloud/lib/authentication/cognitoUserPoolCdkConstruct.ts",
  "/cloud/lib/authentication/cognitoIdentityPoolCdkConstruct.ts",
  "/cloud/enums/ServicePurpose.ts",
];

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

    console.log(authenticationTree.files);

    console.log(
      jasmine.arrayWithExactContents([
        ...expectedJanushTemplateFiles,
        ...expectedAuthenticationTemplateFiles,
      ])
    );

    expect(authenticationTree.files).toEqual(
      jasmine.arrayWithExactContents([
        ...expectedJanushTemplateFiles,
        ...expectedAuthenticationTemplateFiles,
      ])
    );
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

    expect(templateTree.files).toEqual(
      jasmine.arrayWithExactContents([
        ...expectedJanushTemplateFiles,
        ...expectedAuthenticationTemplateFiles,
        ...expectedAuthenticationEmailsTemplateFiles,
      ])
    );
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

    expect(templateTree.files).toEqual(
      jasmine.arrayWithExactContents([
        ...expectedJanushTemplateFiles,
        ...expectedAuthenticationTemplateFiles,
      ])
    );
  });

  it("should check inserted construct to stack", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const authenticationConstruct = fs
      .readFileSync(
        path.join(
          __dirname,
          "other-files/cloud-stack/authentication-construct.template"
        )
      )
      .toString("utf-8");

    const importStatement =
      "import { CognitoCdkConstruct } from './authentication/cognitoCdkConstruct'";

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

    expect(cloudStackFile).toContain(authenticationConstruct);
  });
});
