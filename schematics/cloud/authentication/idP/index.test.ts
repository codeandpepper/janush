import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

import { IdentityProviders, Module } from "@enums/Module";
import { Schematic } from "@enums/Schematic";
import { emptyJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const { FACEBOOK, GOOGLE, APPLE } = IdentityProviders;
const collectionPath = path.join(__dirname, "../../../collection.json");

describe("cloud.authentication.idP", () => {
  it("should generate all idP files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        Schematic.CLOUD,
        {
          name: "janush-app",
          modules: [Module.AUTHENTICATION],
          idP: [FACEBOOK, GOOGLE, APPLE],
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toIncludeEvery([
      "/cloud/lib/authentication/identityProviders/facebookIdentityProvider.ts",
      "/cloud/lib/authentication/identityProviders/googleIdentityProvider.ts",
      "/cloud/lib/authentication/identityProviders/appleIdentityProvider.ts",
      "/cloud/lib/authentication/identityProviders/index.ts",
    ]);
  });

  it("should generate selected idP files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        Schematic.CLOUD,
        {
          name: "janush-app",
          modules: [Module.AUTHENTICATION],
          idP: [FACEBOOK],
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toIncludeEvery([
      "/cloud/lib/authentication/identityProviders/facebookIdentityProvider.ts",
      "/cloud/lib/authentication/identityProviders/index.ts",
    ]);
    expect(tree.files).not.toIncludeSome([
      "/cloud/lib/authentication/identityProviders/googleIdentityProvider.ts",
      "/cloud/lib/authentication/identityProviders/appleIdentityProvider.ts",
    ]);
  });

  it("shouldn't create any idP files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        Schematic.CLOUD,
        {
          name: "janush-app",
          modules: [Module.AUTHENTICATION],
          idP: [],
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).not.toIncludeSome([
      "/cloud/lib/authentication/identityProviders/facebookIdentityProvider.ts",
      "/cloud/lib/authentication/identityProviders/googleIdentityProvider.ts",
      "/cloud/lib/authentication/identityProviders/appleIdentityProvider.ts",
      "/cloud/lib/authentication/identityProviders/index.ts",
    ]);
  });
});
