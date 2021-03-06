import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import path from "path";

import { emptyJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const collectionPath = path.join(__dirname, "./data/testCollection.json");

describe("addEmailsConstructToCognitoConstruct", () => {
  it("should throw `FileDoesNotExistException`", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    try {
      await runner
        .runSchematicAsync("test.util", { name: "testName", modules: [] }, Tree.empty())
        .toPromise();
    } catch (err) {
      expect(err.message).toEqual('Path "cognitoUserPoolCdkConstruct.ts" does not exist.');
    }
  });
});
