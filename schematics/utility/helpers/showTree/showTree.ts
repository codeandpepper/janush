import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

export const showTree = (node: ts.Node, indent = "    "): void => {
  console.log(indent + ts.SyntaxKind[node.kind]);

  if (node.getChildCount() === 0) {
    console.log(indent + "    Text: " + node.getText());
  }

  for (const child of node.getChildren()) {
    showTree(child, indent + "    ");
  }
};
