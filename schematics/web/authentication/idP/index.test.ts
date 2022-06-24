import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import * as path from "path";

import { IdentityProviders, Module } from "@enums/Module";
import { Schematic } from "@enums/Schematic";
import { emptyJanush } from "@mocks/janush";
import * as janush from "@utility/janushJson";

const { FACEBOOK, GOOGLE, APPLE } = IdentityProviders;
const collectionPath = path.join(__dirname, "../../../collection.json");

describe("idP", () => {
  it("should create all idP files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        Schematic.WEB,
        {
          name: "janush-app",
          modules: [Module.AUTHENTICATION],
          idP: [FACEBOOK, GOOGLE, APPLE],
          e2e: false,
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toIncludeEvery([
      "/web/src/components/FederatedSignIn/FederatedSignIn.tsx",
      "/web/src/components/icons/FacebookIcon.tsx",
      "/web/src/components/icons/GoogleIcon.tsx",
      "/web/src/components/icons/AppleIcon.tsx",
      "/web/src/components/icons/index.ts",
    ]);
  });

  it("should create selected idP files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        Schematic.WEB,
        {
          name: "janush-app",
          modules: [Module.AUTHENTICATION],
          idP: [FACEBOOK],
          e2e: false,
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toIncludeEvery([
      "/web/src/components/FederatedSignIn/FederatedSignIn.tsx",
      "/web/src/components/icons/FacebookIcon.tsx",
      "/web/src/components/icons/index.ts",
    ]);
    expect(tree.files).not.toIncludeSome([
      "/web/src/components/icons/GoogleIcon.tsx",
      "/web/src/components/icons/AppleIcon.tsx",
    ]);
  });

  it("shouldn't create any idP files", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    jest.spyOn(janush, "readJanushJSON").mockReturnValue(emptyJanush);
    jest.spyOn(janush, "updateJanushJSON").mockImplementation();

    const tree = await runner
      .runSchematicAsync(
        Schematic.WEB,
        {
          name: "janush-app",
          modules: [Module.AUTHENTICATION],
          idP: [],
          e2e: false,
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).not.toIncludeSome([
      "/web/src/components/FederatedSignIn/FederatedSignIn.tsx",
      "/web/src/components/icons/FacebookIcon.tsx",
      "/web/src/components/icons/GoogleIcon.tsx",
      "/web/src/components/icons/AppleIcon.tsx",
      "/web/src/components/icons/index.ts",
    ]);
  });
});
