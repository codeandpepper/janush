import { Tree } from "@angular-devkit/schematics";
import { SchematicTestRunner } from "@angular-devkit/schematics/testing";
import { FileDoesNotExistException } from "@angular-devkit/core";
import * as path from "path";
import * as janush from "@utility/janush-json";
import { emptyJanush } from "@mocks/janush";

const collectionPath = path.join(__dirname, "../../collection.json");

export const expectedFiles = [
  "/web/README.md",
  "/web/package.json",
  "/web/tsconfig.json",
  "/web/.eslintignore",
  "/web/.eslintrc.json",
  "/web/.gitignore",
  "/web/.prettierrc.json",
  "/web/config-overrides.js",
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
  "/web/src/logo.svg",
  "/web/src/react-app-env.d.ts",
  "/web/src/reportWebVitals.ts",
  "/web/src/setupTests.ts",
  "/web/src/awsConfig.ts",
  "/web/src/features/Providers/Providers.tsx",
  "/web/src/features/SuspenseProvider/SuspenseProvider.tsx",
  "/web/src/features/SuspenseProvider/styles.ts",
  "/web/src/features/ThemeProvider/ThemeProvider.tsx",
  "/web/src/features/UserProvider/UserProvider.tsx",
  "/web/src/features/UserProvider/useUserContext.tsx",
  "/web/src/layouts/Logo/Logo.tsx",
  "/web/src/layouts/Logo/styles.ts",
  "/web/src/layouts/PageLayout/PageLayout.test.tsx",
  "/web/src/layouts/PageLayout/PageLayout.tsx",
  "/web/src/layouts/TopAppBar/TopAppBar.tsx",
  "/web/src/layouts/AuthLayout/AuthLayout.tsx",
  "/web/src/layouts/AuthLayout/styles.ts",
  "/web/src/routing/Routes.test.tsx",
  "/web/src/routing/Routes.tsx",
  "/web/src/routing/paths.ts",
  "/web/src/routing/routes/Index/IndexPage.tsx",
  "/web/src/routing/routes/ConfirmSignUp/ConfirmSignUp.test.tsx",
  "/web/src/routing/routes/ConfirmSignUp/ConfirmSignUp.tsx",
  "/web/src/routing/routes/SignIn/SignIn.test.tsx",
  "/web/src/routing/routes/SignIn/SignIn.tsx",
  "/web/src/routing/routes/SignIn/SignInView/SignInView.tsx",
  "/web/src/routing/routes/SignIn/SignInView/SignInForm/SignInForm.tsx",
  "/web/src/routing/routes/SignIn/SignInView/SignInForm/SignInFormState.ts",
  "/web/src/routing/routes/SignIn/SignInView/SignInForm/signInFormValidationSchema.ts",
  "/web/src/routing/routes/SignIn/SignInView/SignInForm/styles.ts",
  "/web/src/routing/routes/SignUp/SignUp.test.tsx",
  "/web/src/routing/routes/SignUp/SignUp.tsx",
  "/web/src/routing/routes/SignUp/SignUpView/SignUpView.tsx",
  "/web/src/routing/routes/SignUp/SignUpView/SignUpForm/SignUpForm.tsx",
  "/web/src/routing/routes/SignUp/SignUpView/SignUpForm/SignUpFormState.ts",
  "/web/src/routing/routes/SignUp/SignUpView/SignUpForm/signUpFormValidationSchema.ts",
  "/web/src/routing/routes/SignUp/SignUpView/SignUpForm/styles.ts",
  "/web/src/routing/routes/VerifyEmail/VerifyEmail.test.tsx",
  "/web/src/routing/routes/VerifyEmail/VerifyEmail.tsx",
  "/web/src/routing/routes/VerifyEmail/styles.ts",
  "/web/src/themes/defaultTheme.ts",
  "/web/src/themes/palette.ts",
  "/web/src/components/AuthBottomBar/AuthBottomBar.test.tsx",
  "/web/src/components/AuthBottomBar/AuthBottomBar.tsx",
  "/web/src/components/EmailField/EmailField.tsx",
  "/web/src/components/Form/Form.tsx",
  "/web/src/components/Link/Link.tsx",
  "/web/src/components/PasswordField/PasswordField.test.tsx",
  "/web/src/components/PasswordField/PasswordField.tsx",
  "/web/src/components/TextField/TextField.tsx",
  "/web/src/consts/index.ts",
  "/web/src/interfaces/Cognito.ts",
  "/web/src/interfaces/User.ts",
  "/web/src/types/enums/Cognito.ts",
  "/web/src/types/enums/HubEvent.ts",
  "/web/src/types/useful/Nullable.ts",
  "/web/src/types/useful/index.ts",
  "/web/src/utils/hooks/useQuery.ts",
  "/web/src/utils/validation/passwordValidation.ts",
  "/web/src/utils/validation/validateMaxStringLength.ts",
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
