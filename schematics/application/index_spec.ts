import * as path from "path";
import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";

// Cloud Files
import expectedCloudTemplateFiles from "@janush-schematics/cloud/template/data/expected-new-files.json";
import expectedCloudJanushFiles from "@janush-schematics/cloud/janush/data/expected-new-files.json";
import expectedCloudAuthCognitoFiles from "@janush-schematics/cloud/authentication/cognito/data/expected-new-files.json";
import expectedCloudAuthEmailFiles from "@janush-schematics/cloud/authentication/emails/data/expected-new-files.json";
// Web files
import expectedWebTemplateFiles from "@janush-schematics/web/template/data/expected-new-files.json";
import expectedWebJanushFiles from "@janush-schematics/web/janush/data/expected-new-files.json";
import expectedWebAuthFiles from "@janush-schematics/web/authentication/data/expected-new-files.json";

const getParser = (name: string) => (filePath: string) => `/${name}${filePath}`;

const name = "janush-app";
const pathParser = getParser(name);

const collectionPath = path.join(__dirname, "../collection.json");

const expectedBaseFiles = [`/${name}/README.md`, `/${name}/janush.json`];
const expectedWebFiles = [
  ...expectedWebTemplateFiles,
  ...expectedWebJanushFiles,
  ...expectedWebAuthFiles,
];
const expectedCloudFiles = [
  ...expectedCloudTemplateFiles,
  ...expectedCloudJanushFiles,
  ...expectedCloudAuthCognitoFiles,
  ...expectedCloudAuthEmailFiles,
];

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

    expect(tree.files).toHaveEqualElements([
      ...expectedBaseFiles,
      ...expectedWebFiles.map(pathParser),
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

    expect(tree.files).toHaveEqualElements([
      ...expectedBaseFiles,
      ...expectedCloudFiles.map(pathParser),
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

    expect(tree.files).toHaveEqualElements([
      ...expectedBaseFiles,
      ...expectedCloudFiles.map(pathParser),
      ...expectedWebFiles.map(pathParser),
    ]);
  });
});
