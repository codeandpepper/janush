import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

// Cloud Files
import expectedCloudAuthCognitoFiles from "@janush-schematics/cloud/authentication/cognito/data/expectedNewFiles.json";
import expectedCloudAuthEmailFiles from "@janush-schematics/cloud/authentication/emails/data/expectedNewFiles.json";
import expectedCloudJanushFiles from "@janush-schematics/cloud/janush/data/expectedNewFiles.json";
import expectedCloudTemplateFiles from "@janush-schematics/cloud/template/data/expectedNewFiles.json";
// Web files
import expectedWebAuthFiles from "@janush-schematics/web/authentication/data/expectedNewFiles.json";
import expectedWebJanushFiles from "@janush-schematics/web/janush/data/expectedNewFiles.json";
import expectedWebTemplateFiles from "@janush-schematics/web/template/data/expectedNewFiles.json";

const getParser = (name: string) => (filePath: string) => `/${name}${filePath}`;

const name = "janush-app";
const pathParser = getParser(name);

const collectionPath = path.join(__dirname, "../collection.json");

const expectedBaseFiles = [`/${name}/README.md`, `/${name}/janush.json`];
const expectedBotFiles = [
  "/.github/actions/amplify/action.yml",
  "/.github/actions/amplify/index.ts",
  "/.github/actions/amplify/dist/index.js",
  "/.github/actions/cognito/action.yml",
  "/.github/actions/cognito/index.ts",
  "/.github/actions/cognito/dist/index.js",
  "/.github/workflows/main.yml",
  "/.github/workflows/bin/waitForAmplifyJob.sh",
  "/cloud/bin/janush-app-ci.ts",
  "/cloud/lib/janush-app-ci-stack.ts",
];
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
          e2e: false,
        },
        Tree.empty(),
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
        Tree.empty(),
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
          e2e: false,
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toHaveEqualElements([
      ...expectedBaseFiles,
      ...expectedCloudFiles.map(pathParser),
      ...expectedWebFiles.map(pathParser),
    ]);
  });

  it("generate full project as bot", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync(
        "application",
        {
          name,
          types: ["cloud", "web"],
          modules: ["authentication"],
          e2e: false,
          isAutoGenerated: true,
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toHaveEqualElements([
      ...expectedBaseFiles,
      ...expectedBotFiles.map(pathParser),
      ...expectedCloudFiles.map(pathParser),
      ...expectedWebFiles.map(pathParser),
    ]);
  });
});
