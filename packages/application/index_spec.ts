import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

import { expectedFiles as expectedCloudFiles } from "../cloud/index_spec";
import { expectedFiles as expectedWebFiles } from "../web/index_spec";

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
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toEqual([
      ...expectedFiles,
      ...expectedCloudFiles.map((f) => `/${name}${f}`),
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
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toEqual(
      jasmine.arrayContaining([
        ...expectedFiles,
        ...expectedCloudFiles.map((f) => `/${name}${f}`),
        ...expectedWebFiles.map((f) => `/${name}${f}`),
      ]),
    );
  });
});
