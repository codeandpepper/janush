import { SchematicsException } from "@angular-devkit/schematics";
import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import { getSourceNodes } from "@schematics/angular/utility/ast-utils";

export const getEndCloseBraceTokenInConstructor = (
  sourceFile: ts.SourceFile,
  errorMessage = "It is impossible to add construct to your stack.",
): ts.Node => {
  const nodes: ts.Node[] = getSourceNodes(sourceFile);

  const stackConstructorNode = nodes.find((n) => n.kind === ts.SyntaxKind.Constructor);

  const stackConstructorNodeBlock = stackConstructorNode
    ?.getChildren()
    ?.find((n) => n.kind === ts.SyntaxKind.Block);

  const stackConstructorNodeBlockCloseBraceToken = stackConstructorNodeBlock
    ?.getChildren()
    .find((n) => n.kind === ts.SyntaxKind.CloseBraceToken);

  if (!stackConstructorNodeBlockCloseBraceToken) {
    throw new SchematicsException(errorMessage);
  }

  return stackConstructorNodeBlockCloseBraceToken;
};
