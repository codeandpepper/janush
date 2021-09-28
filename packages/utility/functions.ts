import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import { getSourceNodes } from "@schematics/angular/utility/ast-utils";
import { SchematicsException } from "@angular-devkit/schematics";

export const getEndCloseBraceTokenInConstruct = (
  sourceFile: ts.SourceFile,
  errorMessage: string = "It is impossible to add construct to your stack."
): ts.Node => {
  const nodes: ts.Node[] = getSourceNodes(sourceFile);

  const stackConstructorNode = nodes.find(
    (n) => n.kind === ts.SyntaxKind.Constructor
  );

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

export const showTree = (node: ts.Node, indent: string = "    "): void => {
  console.log(indent + ts.SyntaxKind[node.kind]);

  if (node.getChildCount() === 0) {
    console.log(indent + "    Text: " + node.getText());
  }

  for (let child of node.getChildren()) {
    showTree(child, indent + "    ");
  }
};
