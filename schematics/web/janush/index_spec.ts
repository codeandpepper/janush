import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { FileDoesNotExistException } from "@angular-devkit/core";
import * as path from "path";
import * as janush from "@utility/janush-json";
import { emptyJanush } from "@mocks/janush";

const collectionPath = path.join(__dirname, "../../collection.json");

export const expectedFiles = [
  "/web/.eslintignore",
  "/web/.eslintrc.json",
  "/web/.gitignore",
  "/web/.prettierrc.json",
  "/web/README.md",
  "/web/config-overrides.js",
  "/web/package.json",
  "/web/tsconfig.json",
  "/web/tsconfig.paths.json",
  "/web/public/favicon.ico",
  "/web/public/index.html",
  "/web/public/logo192.png",
  "/web/public/logo512.png",
  "/web/public/manifest.json",
  "/web/public/robots.txt",
  "/web/src/App.css",
  "/web/src/App.test.tsx",
  "/web/src/App.tsx",
  "/web/src/index.css",
  "/web/src/index.tsx",
  "/web/src/react-app-env.d.ts",
  "/web/src/reportWebVitals.ts",
  "/web/src/setupTests.ts",
  "/web/src/features/Providers/Providers.tsx",
  "/web/src/features/Providers/index.ts.template",
  "/web/src/features/SuspenseProvider/SuspenseProvider.tsx",
  "/web/src/features/SuspenseProvider/index.ts.template",
  "/web/src/features/SuspenseProvider/styles.ts",
  "/web/src/features/ThemeProvider/ThemeProvider.tsx",
  "/web/src/features/ThemeProvider/index.ts.template",
  "/web/src/layouts/AppShell/AppShell.test.tsx",
  "/web/src/layouts/AppShell/AppShell.tsx",
  "/web/src/layouts/AppShell/index.ts.template",
  "/web/src/layouts/Logo/Logo.tsx",
  "/web/src/layouts/Logo/index.ts.template",
  "/web/src/layouts/Logo/styles.ts",
  "/web/src/layouts/PageLayout/PageLayout.test.tsx",
  "/web/src/layouts/PageLayout/PageLayout.tsx",
  "/web/src/layouts/PageLayout/index.ts.template",
  "/web/src/layouts/TopAppBar/TopAppBar.tsx",
  "/web/src/layouts/TopAppBar/index.ts.template",
  "/web/src/routing/Routes.test.tsx",
  "/web/src/routing/Routes.tsx",
  "/web/src/routing/paths.ts",
  "/web/src/routing/routes/Index/index.tsx",
  "/web/src/themes/defaultTheme.ts",
  "/web/src/themes/palette.ts",
];

describe("web", () => {
  it("should generate all files properly", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);

    spyOn(janush, "readJanushJSON").and.returnValue(emptyJanush);
    spyOn(janush, "updateJanushJSON");

    const tree = await runner
      .runSchematicAsync("web", { name: "janush-app" }, Tree.empty())
      .toPromise();

    expect(tree.files).toEqual(expectedFiles);
  });

  it("should throw not found exception of janush.json", async () => {
    const runner = new SchematicTestRunner("schematics", collectionPath);
    let thrownError: FileDoesNotExistException | null = null;
    try {
      await runner
        .runSchematicAsync("web", { name: "janush-app" }, Tree.empty())
        .toPromise();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeDefined();
  });
});
