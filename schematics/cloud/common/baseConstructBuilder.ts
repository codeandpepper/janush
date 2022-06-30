import { FileDoesNotExistException, Tree } from "@angular-devkit/schematics";
import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import { insertImport } from "@schematics/angular/utility/ast-utils";
import { InsertChange } from "@schematics/angular/utility/change";
import fs from "fs";
import path from "path";

import { Schematic } from "@enums/Schematic";
import { ConstructContextBase } from "@janush-schematics/cloud/interfaces/constructContextBase.interface";
import { ConstrucctInfo } from "@janush-schematics/cloud/interfaces/constructInfo.interface";
import { getEndCloseBraceTokenInConstructor } from "@utility/helpers";

interface ConstructChangeRules {
  importChange: InsertChange;
  constructChange: InsertChange;
}

export class BaseConstructBuilder {
  protected readonly projectName: string;

  constructor(projectName: string) {
    this.projectName = projectName;
  }

  protected createContext = (
    injectedContextPath: string,
    currentDirectory: string,
  ): ConstructContextBase => {
    const cloudStackPath = `${Schematic.CLOUD}/lib/${this.projectName}-stack.ts`;

    const construct = fs
      .readFileSync(path.join(currentDirectory, injectedContextPath))
      .toString("utf-8");

    return {
      cloudStackPath,
      construct,
      projectName: this.projectName,
    };
  };

  protected addConstruct = (
    tree: Tree,
    context: ConstructContextBase,
    constructInfo: ConstrucctInfo,
  ): ConstructChangeRules => {
    const cloudStackCode = tree.read(context.cloudStackPath);

    if (!cloudStackCode) {
      throw new FileDoesNotExistException(context.projectName);
    }

    const sourceCloudStackCode = cloudStackCode.toString("utf-8");
    const sourceFile = ts.createSourceFile(
      context.cloudStackPath,
      sourceCloudStackCode,
      ts.ScriptTarget.Latest,
      true,
    );
    const stackEndCloseBraceToken = getEndCloseBraceTokenInConstructor(sourceFile);
    const constructChange = new InsertChange(
      context.cloudStackPath,
      stackEndCloseBraceToken.getStart(),
      context.construct,
    );
    const importChange = insertImport(
      sourceFile,
      context.cloudStackPath,
      constructInfo.symbolName,
      constructInfo.fileName,
    ) as InsertChange;

    return { constructChange, importChange };
  };
}
