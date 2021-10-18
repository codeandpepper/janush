import {
  FileDoesNotExistException,
  Rule,
  Tree,
} from "@angular-devkit/schematics";
import {
  getSourceNodes,
  insertImport,
} from "@schematics/angular/utility/ast-utils";

import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import * as fs from "fs";
import * as path from "path";

import { InsertChange } from "@schematics/angular/utility/change";
import { Schematic } from "@enums/Schematic";

const construct = fs
  .readFileSync(
    path.join(__dirname, "..", "other-files/TopAppBar/signOut.template")
  )
  .toString("utf-8");

const construct2 = fs
  .readFileSync(
    path.join(__dirname, "..", "other-files/TopAppBar/TopAppBar.template")
  )
  .toString("utf-8");

export const changeTopAppBar = (projectName: string) => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/src/layouts/TopAppBar/TopAppBar.tsx`;
    let fileContent = tree.read(filePath);

    const fileContentAsSourceCode =
      fileContent && fileContent.toString("utf-8");

    if (!fileContent) throw new FileDoesNotExistException(projectName);

    const modifiedFileToSave = ts.createSourceFile(
      filePath,
      fileContentAsSourceCode + "\n" ?? "error",
      ts.ScriptTarget.Latest,
      true
    );

    const nodes = getSourceNodes(modifiedFileToSave);

    const htmlSigns = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.JsxSelfClosingElement
    );

    const returnKeyword = nodes.find(
      (n) => n.kind === ts.SyntaxKind.ReturnKeyword
    );

    let changed;
    let logoChanged;

    if (htmlSigns) {
      let logo = htmlSigns.find((sign) => sign.getText() === "<Logo />");

      if (logo) {
        logoChanged = new InsertChange(
          filePath,
          logo?.getEnd() + 1,
          construct2
        );
      }
    }

    if (returnKeyword) {
      changed = new InsertChange(
        filePath,
        returnKeyword?.getStart() - 2,
        construct
      );
    }

    const importAuthFromAmplify = insertImport(
      modifiedFileToSave,
      filePath,
      "Auth",
      "aws-amplify"
    ) as InsertChange;

    const importUseUserContext = insertImport(
      modifiedFileToSave,
      filePath,
      "useUserContext",
      "@features/UserProvider/useUserContext",
      true
    ) as InsertChange;

    const importNavLink = insertImport(
      modifiedFileToSave,
      filePath,
      "NavLink",
      "react-router-dom"
    ) as InsertChange;

    const importPaths = insertImport(
      modifiedFileToSave,
      filePath,
      "Paths",
      "@routing/paths",
      true
    ) as InsertChange;

    const importButton = insertImport(
      modifiedFileToSave,
      filePath,
      "Button",
      "@mui/material"
    ) as InsertChange;

    const declarationRecorder = tree.beginUpdate(filePath);

    if (logoChanged) {
      declarationRecorder.insertLeft(logoChanged.pos, logoChanged.toAdd);
    }
    if (changed) {
      declarationRecorder.insertLeft(changed.pos, changed.toAdd);
    }
    declarationRecorder.insertLeft(
      importAuthFromAmplify.pos,
      importAuthFromAmplify.toAdd
    );
    declarationRecorder.insertLeft(
      importUseUserContext.pos,
      importUseUserContext.toAdd
    );
    declarationRecorder.insertLeft(importNavLink.pos, importNavLink.toAdd);
    declarationRecorder.insertLeft(importPaths.pos, importPaths.toAdd);
    declarationRecorder.insertLeft(importButton.pos, importButton.toAdd);

    tree.commitUpdate(declarationRecorder);

    return tree;
  };
};

export const changeProviders = (projectName: string) => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/src/features/Providers/Providers.tsx`;
    let fileContent = tree.read(filePath);

    const fileContentAsSourceCode =
      fileContent && fileContent.toString("utf-8");

    if (!fileContent) throw new FileDoesNotExistException(projectName);

    const modifiedFileToSave = ts.createSourceFile(
      filePath,
      fileContentAsSourceCode + "\n" ?? "error",
      ts.ScriptTarget.Latest,
      true
    );

    const nodes = getSourceNodes(modifiedFileToSave);

    const htmlStartingNodes = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.JsxOpeningElement
    );
    const htmlEndingNodes = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.JsxClosingElement
    );

    const openingNode = htmlStartingNodes.find(
      (sign) => sign.getText() === "<ThemeProvider>"
    );
    const endingNode = htmlEndingNodes.find(
      (sign) => sign.getText() === "</ThemeProvider>"
    );

    const updatedTree = tree.beginUpdate(filePath);

    if (openingNode && endingNode) {
      const openingUserProviderChange = new InsertChange(
        filePath,
        openingNode.getEnd(),
        "\n<UserProvider>"
      );

      const endingUserProviderChange = new InsertChange(
        filePath,
        endingNode.getStart(),
        "</UserProvider>\n"
      );

      updatedTree.insertLeft(
        openingUserProviderChange.pos,
        openingUserProviderChange.toAdd
      );
      updatedTree.insertLeft(
        endingUserProviderChange.pos,
        endingUserProviderChange.toAdd
      );
    }

    const importUserProvider = insertImport(
      modifiedFileToSave,
      filePath,
      "UserProvider",
      "@features/UserProvider/UserProvider",
      true
    ) as InsertChange;

    updatedTree.insertLeft(importUserProvider.pos, importUserProvider.toAdd);

    tree.commitUpdate(updatedTree);

    return tree;
  };
};

export const changeIndex = (projectName: string) => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/src/index.tsx`;
    let fileContent = tree.read(filePath);

    const fileContentAsSourceCode =
      fileContent && fileContent.toString("utf-8");

    if (!fileContent) throw new FileDoesNotExistException(projectName);

    const modifiedFileToSave = ts.createSourceFile(
      filePath,
      fileContentAsSourceCode + "\n" ?? "error",
      ts.ScriptTarget.Latest,
      true
    );

    const nodes = getSourceNodes(modifiedFileToSave);

    const updatedTree = tree.beginUpdate(filePath);

    const placementLine = nodes.find(
      (n) => n.kind === ts.SyntaxKind.PropertyAccessExpression
    );

    if (placementLine) {
      const configureAwsChange = new InsertChange(
        filePath,
        placementLine.getStart() - 1,
        "\nconfigureAws(); \n"
      );

      updatedTree.insertLeft(configureAwsChange.pos, configureAwsChange.toAdd);
    }

    const importUserProvider = insertImport(
      modifiedFileToSave,
      filePath,
      "configureAws",
      "./awsConfig",
      true
    ) as InsertChange;

    updatedTree.insertLeft(importUserProvider.pos, importUserProvider.toAdd);

    tree.commitUpdate(updatedTree);

    return tree;
  };
};

export const changeConfigOverrides = (projectName: string) => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/config-overrides.js`;
    let fileContent = tree.read(filePath);

    const fileContentAsSourceCode =
      fileContent && fileContent.toString("utf-8");

    if (!fileContent) throw new FileDoesNotExistException(projectName);

    const modifiedFileToSave = ts.createSourceFile(
      filePath,
      fileContentAsSourceCode + "\n" ?? "error",
      ts.ScriptTarget.Latest,
      true
    );

    const nodes = getSourceNodes(modifiedFileToSave);

    const updatedTree = tree.beginUpdate(filePath);

    const configSpreadOperators = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.SpreadAssignment
    );

    const configAlias = configSpreadOperators.find(
      (n) => n.getText() === "...config.alias"
    );

    if (configAlias) {
      const addMissingAbsolutePaths = new InsertChange(
        filePath,
        configAlias.getEnd() + 1,
        '\n"@components": path.resolve(__dirname, "src/components"),\n' +
          '      "@consts": path.resolve(__dirname, "src/consts"),\n' +
          '      "@interfaces": path.resolve(__dirname, "src/interfaces"),\n' +
          '      "@types": path.resolve(__dirname, "src/types"),\n' +
          '      "@utils": path.resolve(__dirname, "src/utils"),'
      );

      updatedTree.insertLeft(
        addMissingAbsolutePaths.pos,
        addMissingAbsolutePaths.toAdd
      );
    }

    tree.commitUpdate(updatedTree);

    return tree;
  };
};

export const changePackageJson = (projectName: string) => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/package.json`;
    let fileContent = tree.read(filePath);

    const fileContentAsSourceCode =
      fileContent && fileContent.toString("utf-8");

    if (!fileContent) throw new FileDoesNotExistException(projectName);

    const modifiedFileToSave = ts.createSourceFile(
      filePath,
      fileContentAsSourceCode + "\n" ?? "error",
      ts.ScriptTarget.Latest,
      true
    );

    const nodes = getSourceNodes(modifiedFileToSave);

    const updatedTree = tree.beginUpdate(filePath);

    const stringLiterals = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.StringLiteral
    );

    const moduleNameMapper = stringLiterals.find(
      (n) => n.getText() === '"moduleNameMapper"'
    );

    if (moduleNameMapper) {
      const addMissingAbsolutePaths = new InsertChange(
        filePath,
        moduleNameMapper.getEnd() + 4,
        '"@components/(.*)": "<rootDir>/src/components/$1",\n' +
          '      "@consts/(.*)": "<rootDir>/src/consts/$1",\n' +
          '      "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",\n' +
          '      "@types/(.*)": "<rootDir>/src/types/$1",\n' +
          '      "@utils/(.*)": "<rootDir>/src/utils/$1",\n'
      );

      updatedTree.insertLeft(
        addMissingAbsolutePaths.pos,
        addMissingAbsolutePaths.toAdd
      );
    }

    tree.commitUpdate(updatedTree);

    return tree;
  };
};

export const changeTsConfigPaths = (projectName: string) => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/tsconfig.paths.json`;
    let fileContent = tree.read(filePath);

    const fileContentAsSourceCode =
      fileContent && fileContent.toString("utf-8");

    if (!fileContent) throw new FileDoesNotExistException(projectName);

    const modifiedFileToSave = ts.createSourceFile(
      filePath,
      fileContentAsSourceCode + "\n" ?? "error",
      ts.ScriptTarget.Latest,
      true
    );

    const nodes = getSourceNodes(modifiedFileToSave);

    const updatedTree = tree.beginUpdate(filePath);

    const stringLiterals = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.StringLiteral
    );

    const paths = stringLiterals.find((n) => n.getText() === '"paths"');

    if (paths) {
      const addMissingAbsolutePaths = new InsertChange(
        filePath,
        paths.getEnd() + 4,
        '"@components/*": ["./src/components/*"],\n' +
          '      "@consts/*": [".src/consts/*"],\n' +
          '      "@interfaces/*": ["./src/interfaces/*"],\n' +
          '      "@types/*": ["./src/types/*"],\n' +
          '      "@utils/*": ["./src/utils/*"],\n'
      );

      updatedTree.insertLeft(
        addMissingAbsolutePaths.pos,
        addMissingAbsolutePaths.toAdd
      );
    }

    tree.commitUpdate(updatedTree);

    return tree;
  };
};

export const changePaths = (projectName: string) => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/src/routing/paths.ts`;
    let fileContent = tree.read(filePath);

    const fileContentAsSourceCode =
      fileContent && fileContent.toString("utf-8");

    if (!fileContent) throw new FileDoesNotExistException(projectName);

    const modifiedFileToSave = ts.createSourceFile(
      filePath,
      fileContentAsSourceCode + "\n" ?? "error",
      ts.ScriptTarget.Latest,
      true
    );

    const nodes = getSourceNodes(modifiedFileToSave);

    const updatedTree = tree.beginUpdate(filePath);

    const enumDeclarations = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.EnumDeclaration
    );

    const paths = enumDeclarations.find((n) =>
      n.getText().includes('BASE = "/",')
    );

    if (paths) {
      const addMissingAbsolutePaths = new InsertChange(
        filePath,
        paths.getEnd() - 1,
        'SIGN_IN_PATH = "/sign-in",\n' +
          'SIGN_UP_PATH = "/sign-up",\n' +
          'VERIFY_EMAIL_PATH = "/verify-email"\n'
      );

      updatedTree.insertLeft(
        addMissingAbsolutePaths.pos,
        addMissingAbsolutePaths.toAdd
      );
    }

    tree.commitUpdate(updatedTree);

    return tree;
  };
};

export const changeRoutes = (projectName: string) => {
  return (tree: Tree) => {
    const filePath = `${Schematic.WEB}/src/routing/Routes.tsx`;
    let fileContent = tree.read(filePath);

    const fileContentAsSourceCode =
      fileContent && fileContent.toString("utf-8");

    if (!fileContent) throw new FileDoesNotExistException(projectName);

    const modifiedFileToSave = ts.createSourceFile(
      filePath,
      fileContentAsSourceCode + "\n" ?? "error",
      ts.ScriptTarget.Latest,
      true
    );

    const nodes = getSourceNodes(modifiedFileToSave);

    const updatedTree = tree.beginUpdate(filePath);

    const stringLiterals = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.StringLiteral
    );

    const paths = stringLiterals.find((n) =>
      n.getText().includes('"./routes/Index"')
    );

    if (paths) {
      const addMissingAbsolutePaths = new InsertChange(
        filePath,
        paths.getEnd(),
        '));\nconst SignIn = lazy(() => import("./routes/SignIn"));' +
          '\nconst SignUp = lazy(() => import("./routes/SignUp"));' +
          '\nconst VerifyEmail = lazy(() => import("./routes/VerifyEmail"'
      );

      updatedTree.insertLeft(
        addMissingAbsolutePaths.pos,
        addMissingAbsolutePaths.toAdd
      );
    }

    const htmlAttributes = nodes.filter(
      (n) => n.kind === ts.SyntaxKind.JsxSelfClosingElement
    );

    const attr = htmlAttributes.find((n) => n.getText().includes("Route"));

    if (attr) {
      const addMissingAbsolutePaths = new InsertChange(
        filePath,
        attr.getStart() - 1,
        "<Route path={Paths.SIGN_IN_PATH} component={SignIn} />\n" +
          "<Route path={Paths.SIGN_UP_PATH} component={SignUp} />\n" +
          "<Route path={Paths.VERIFY_EMAIL_PATH} component={VerifyEmail} />\n"
      );

      updatedTree.insertLeft(
        addMissingAbsolutePaths.pos,
        addMissingAbsolutePaths.toAdd
      );
    }

    const importPaths = insertImport(
      modifiedFileToSave,
      filePath,
      "Paths",
      "@routing/paths",
      true
    ) as InsertChange;

    updatedTree.insertLeft(importPaths.pos, importPaths.toAdd);

    tree.commitUpdate(updatedTree);

    return tree;
  };
};

export const authenticationChanges = (name: string): Rule[] => {
  return [
    changeTopAppBar(name),
    changeProviders(name),
    changeIndex(name),
    changeConfigOverrides(name),
    changePackageJson(name),
    changeTsConfigPaths(name),
    changePaths(name),
    changeRoutes(name),
  ];
};
