import * as path from "path";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";

import expectedAuthenticationCloudFiles from "@janush-schematics/cloud/authentication/cognito/data/expected-files.json";
import expectedAuthenticationEmailsTemplateFiles from "@janush-schematics/cloud/authentication/emails/data/expected-files.json";
import expectedJanushCloudFiles from "@janush-schematics/cloud/janush/data/expected-files.json";
import expectedWebFiles from "@janush-schematics/web/template/data/expected-files.json";

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
          modules: ["authentication"],
        },
        Tree.empty()
      )
      .toPromise();

    expect(tree.files).toEqual([
      ...expectedFiles,
      ...expectedWebFiles.map((f) => `/${name}${f}`),
    ]);
  });

  it("generate cloud structure", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync(
        "application",
        {
          name,
          types: ["cloud"],
          modules: ["authentication"],
          skipInstall: true,
          emails: true,
        },
        Tree.empty()
      )
      .toPromise();

    expect(tree.files).toHaveSameElements([
      ...expectedFiles,
      ...expectedJanushCloudFiles.map((f) => `/${name}${f}`),
      ...expectedAuthenticationCloudFiles.map((f) => `/${name}${f}`),
      ...expectedAuthenticationEmailsTemplateFiles.map((f) => `/${name}${f}`),
    ]);
  });

  it("generate both structures", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync(
        "application",
        {
          name,
          types: ["cloud", "web"],
          modules: ["authentication"],
        },
        Tree.empty()
      )
      .toPromise();

    expect(tree.files).toHaveSameElements([
      ...expectedFiles,
      ...expectedJanushCloudFiles.map((f) => `/${name}${f}`),
      ...expectedAuthenticationCloudFiles.map((f) => `/${name}${f}`),
      ...expectedAuthenticationEmailsTemplateFiles.map((f) => `/${name}${f}`),
      ...expectedWebFiles.map((f) => `/${name}${f}`),
    ]);
  });
});
