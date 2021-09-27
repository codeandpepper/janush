import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { Tree } from "@angular-devkit/schematics";
import * as path from "path";
import * as janush from "@utility/janush-json";
import * as fs from "fs";

import { expectedJanushTemplateFiles } from "@packages/cloud/janush/index_spec";
import { expectedAuthorizationTemplateFiles } from "@packages/cloud/authorization/index_spec";

import { emptyJanush, moduleJanush } from "../../../mocks/janush";
import { Schematic } from "@enums/Schematic";

const collectionPath = path.join(__dirname, "../collection.json");

export const expectedAuthorizationEmailsTemplateFiles = [
  "/cloud/lib/authorization/emails/emailsCdkConstruct.ts",
  "/cloud/lib/authorization/emails/emailsLambda.ts",
  "/cloud/lib/authorization/emails/emailsS3CdkConstruct.ts",
  "/cloud/lib/authorization/emails/utils/index.ts",
  "/cloud/lib/authorization/emails/templates/emailVerification.html",
  "/cloud/lib/authorization/emails/templates/emailVerification.mjml",
  "/cloud/lib/authorization/emails/templates/resetPassword.html",
  "/cloud/lib/authorization/emails/templates/resetPassword.mjml",
  "/cloud/enums/CognitoMessageTriggerSource.ts",
  "/cloud/enums/EmailTemplate.ts",
];

describe("cloud.authorization.emails", () => {
  it("should generate authorization emails", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(emptyJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: [] }, Tree.empty())
      .toPromise();

    const authorizationTree = await runner
      .runSchematicAsync("cloud.authorization", { emails: false }, templateTree)
      .toPromise();

    const authorizationEmailsTree = await runner
      .runSchematicAsync("cloud.authorization.emails", {}, authorizationTree)
      .toPromise();

    expect(authorizationEmailsTree.files).toEqual(
      jasmine.arrayWithExactContents([
        ...expectedJanushTemplateFiles,
        ...expectedAuthorizationTemplateFiles,
        ...expectedAuthorizationEmailsTemplateFiles,
      ]),
    );
  });

  it("should check inserted email construct to cognito user pool", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const emailsConstruct = fs
      .readFileSync(path.join(__dirname, "other-files/cognito-user-pool/emails-construct.template"))
      .toString("utf-8");

    const importStatement = "import { EmailsCdkConstruct } from './emails/emailsCdkConstruct'";

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync(
        "cloud",
        { name: "janush-app", modules: ["authorization"], emails: true },
        Tree.empty(),
      )
      .toPromise();

    const cloudStackFile = templateTree.readContent(
      `${Schematic.CLOUD}/lib/authorization/cognitoUserPoolCdkConstruct.ts`,
    );

    expect(cloudStackFile).toContain(importStatement);

    expect(cloudStackFile).toContain(emailsConstruct);
  });
});
