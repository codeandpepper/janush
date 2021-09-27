import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

import { expectedJanushTemplateFiles as expectedJanushCloudFiles } from "../cloud/janush/index_spec";
import { expectedAuthorizationTemplateFiles as expectedAuthorizationCloudFiles } from "../cloud/authorization/index_spec";
import { expectedAuthorizationEmailsTemplateFiles } from "@packages/cloud/authorization-emails/index_spec";

import { expectedFiles as expectedWebFiles } from "../web/template/index_spec";

const collectionPath = path.join(__dirname, "../collection.json");
const name = "janush-app";
const expectedFiles = [`/${name}/README.md`, `/${name}/janush.json`];

describe("application", () => {
  it("generate web structure", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync(
        "application",
        {
          name,
          types: ["web"],
          modules: ["authorization"],
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toEqual([...expectedFiles, ...expectedWebFiles.map((f) => `/${name}${f}`)]);
  });

  it("generate cloud structure", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync(
        "application",
        {
          name,
          types: ["cloud"],
          modules: ["authorization"],
          skipInstall: true,
          emails: true,
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toEqual(
      jasmine.arrayWithExactContents([
        ...expectedFiles,
        ...expectedJanushCloudFiles.map((f) => `/${name}${f}`),
        ...expectedAuthorizationCloudFiles.map((f) => `/${name}${f}`),
        ...expectedAuthorizationEmailsTemplateFiles.map((f) => `/${name}${f}`),
      ]),
    );
  });

  it("generate both structures", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync(
        "application",
        {
          name,
          types: ["cloud", "web"],
          modules: ["authorization"],
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toEqual(
      jasmine.arrayWithExactContents([
        ...expectedFiles,
        ...expectedJanushCloudFiles.map((f) => `/${name}${f}`),
        ...expectedAuthorizationCloudFiles.map((f) => `/${name}${f}`),
        ...expectedAuthorizationEmailsTemplateFiles.map((f) => `/${name}${f}`),
        ...expectedWebFiles.map((f) => `/${name}${f}`),
      ]),
    );
  });
});
