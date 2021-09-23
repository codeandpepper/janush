import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { Tree } from "@angular-devkit/schematics";
import * as path from "path";
import * as janush from "@utility/janush-json";

import { expectedJanushTemplateFiles } from "@packages/cloud/janush/index_spec";

import { emptyJanush, moduleJanush } from "../../../mocks/janush";

const collectionPath = path.join(__dirname, "../collection.json");

export const expectedAuthorizationTemplateFiles = [
  "/cloud/lib/authorization/cognitoCdkConstruct.ts",
  "/cloud/enums/ServiceProvider.ts",
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
});
