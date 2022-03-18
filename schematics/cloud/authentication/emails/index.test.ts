import * as path from "path";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";

import { Schematic } from "@enums/Schematic";
import { emptyJanush, moduleJanush } from "@mocks/janush";
import expectedAuthenticationTemplateFiles from "@janush-schematics/cloud/authentication/cognito/data/expectedNewFiles.json";
import expectedAuthenticationEmailsTemplateFiles from "@janush-schematics/cloud/authentication/emails/data/expectedNewFiles.json";
import expectedJanushFiles from "@janush-schematics/cloud/janush/data/expectedNewFiles.json";
import expectedTemplateFiles from "@janush-schematics/cloud/template/data/expectedNewFiles.json";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "../../../collection.json");

describe("cloud.authentication.emails", () => {
  it("should generate authentication emails", async () => {
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

    const authenticationEmailsTree = await runner
      .runSchematicAsync("cloud.authentication.emails", {}, authenticationTree)
      .toPromise();

    expect(authenticationEmailsTree.files).toHaveEqualElements([
      ...expectedTemplateFiles,
      ...expectedJanushFiles,
      ...expectedAuthenticationTemplateFiles,
      ...expectedAuthenticationEmailsTemplateFiles,
    ]);
  });

  it("should check inserted email construct to cognito user pool", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const importStatement = `import { EmailsCdkConstruct } from "./emails/emailsCdkConstruct";`;

    const emailConstructStatement = "new EmailsCdkConstruct";

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(moduleJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authentication"], emails: true },
        Tree.empty()
      )
      .toPromise();

    const cloudStackFile = templateTree.readContent(
      `${Schematic.CLOUD}/lib/authentication/cognitoUserPoolCdkConstruct.ts`
    );

    expect(cloudStackFile).toContain(importStatement);

    expect(cloudStackFile).toContain(emailConstructStatement);
  });
});
