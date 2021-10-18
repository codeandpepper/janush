import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { Tree } from "@angular-devkit/schematics";
import * as path from "path";
import * as janush from "@utility/janush-json";

import { expectedJanushTemplateFiles } from "@janush-schematics/cloud/janush/index_spec";
import { expectedAuthenticationTemplateFiles } from "@janush-schematics/cloud/authentication/cognito/index_spec";

import { emptyJanush, moduleJanush } from "@mocks/janush";
import { Schematic } from "@enums/Schematic";

const collectionPath = path.join(__dirname, "../../../collection.json");

export const expectedAuthenticationEmailsTemplateFiles = [
  "/cloud/lib/authentication/emails/emailsCdkConstruct.ts",
  "/cloud/lib/authentication/emails/emailsLambda.ts",
  "/cloud/lib/authentication/emails/emailsS3CdkConstruct.ts",
  "/cloud/lib/authentication/emails/utils/index.ts",
  "/cloud/lib/authentication/emails/templates/emailVerification.html",
  "/cloud/lib/authentication/emails/templates/emailVerification.mjml",
  "/cloud/lib/authentication/emails/templates/resetPassword.html",
  "/cloud/lib/authentication/emails/templates/resetPassword.mjml",
  "/cloud/enums/CognitoMessageTriggerSource.ts",
  "/cloud/enums/EmailTemplate.ts",
];

describe("cloud.authentication.emails", () => {
  it("should generate authentication emails", async () => {
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

    const authenticationEmailsTree = await runner
      .runSchematicAsync("cloud.authentication.emails", {}, authenticationTree)
      .toPromise();

    expect(authenticationEmailsTree.files).toEqual(
      jasmine.arrayWithExactContents([
        ...expectedJanushTemplateFiles,
        ...expectedAuthenticationTemplateFiles,
        ...expectedAuthenticationEmailsTemplateFiles,
      ])
    );
  });

  it("should check inserted email construct to cognito user pool", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const importStatement = `import { EmailsCdkConstruct } from "./emails/emailsCdkConstruct"`;

    const emailConstructStatement = "new EmailsCdkConstruct";

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

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
