import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

const collectionPath = path.join(__dirname, "../collection.json");

describe("application", () => {
  it("generate web structure", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync(
        "application",
        {
          name: "janush-app",
          types: ["web"],
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files.length).toEqual(20);
  });

  it("generate cloud structure", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    const tree = await runner
      .runSchematicAsync(
        "application",
        {
          name: "janush-app",
          types: ["cloud"],
        },
        Tree.empty(),
      )
      .toPromise();

    // TODO already cloud implementation is empty only README file
    expect(tree.files.length).toEqual(1);
  });
});
