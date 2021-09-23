import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { Tree } from "@angular-devkit/schematics";
import * as path from "path";
import * as janush from "@utility/janush-json";
import * as fs from "fs";

import { expectedJanushTemplateFiles } from "@packages/cloud/janush/index_spec";

import { emptyJanush, moduleJanush } from "../../../mocks/janush";
import { Schematic } from "@enums/Schematic";

const collectionPath = path.join(__dirname, "../collection.json");

export const expectedAuthorizationTemplateFiles = [
  "/cloud/lib/authorization/cognitoCdkConstruct.ts",
  "/cloud/lib/authorization/cognitoCdkUserPoolConstruct.ts",
  "/cloud/lib/authorization/cognitoCdkIdentityPoolConstruct.ts",
  "/cloud/enums/ServicePurpose.ts",
];

describe("cloud.authorization", () => {
  it("should generate authorization without janush template", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(emptyJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: [] }, Tree.empty())
      .toPromise();

    const authorizationTree = await runner
      .runSchematicAsync("cloud.authorization", {}, templateTree)
      .toPromise();

    expect(authorizationTree.files).toEqual(
      jasmine.arrayWithExactContents([
        ...expectedJanushTemplateFiles,
        ...expectedAuthorizationTemplateFiles,
      ]),
    );
  });

  it("should generate authorization with janush template", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: ["authorization"] }, Tree.empty())
      .toPromise();

    expect(templateTree.files).toEqual(
      jasmine.arrayWithExactContents([
        ...expectedJanushTemplateFiles,
        ...expectedAuthorizationTemplateFiles,
      ]),
    );
  });

  it("should check inserted construct to stack", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    const authorizationConstruct = fs
      .readFileSync(
        path.join(__dirname, "other-files/cloud-stack/authorization-construct.template"),
      )
      .toString("utf-8");

    const importStatement =
      "import { CognitoCdkConstruct } from './authorization/cognitoCdkConstruct'";

    spyOn(janush, "readJanushJSON").and.returnValue(moduleJanush);
    spyOn(janush, "updateJanushJSON");

    const templateTree = await runner
      .runSchematicAsync("cloud", { name: "janush-app", modules: ["authorization"] }, Tree.empty())
      .toPromise();

    const cloudStackFile = templateTree.readContent(`${Schematic.CLOUD}/lib/janush-app-stack.ts`);

    expect(cloudStackFile).toContain(importStatement);

    expect(cloudStackFile).toContain(authorizationConstruct);
  });
});
