import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

/*
   TODO documentation
 */
export const showTree = (node: ts.Node, indent: string = "    "): void => {
  console.log(indent + ts.SyntaxKind[node.kind]);
  if (node.getChildCount() === 0) {
    console.log(indent + "    Text: " + node.getText());
  }

  for (let child of node.getChildren()) {
    showTree(child, indent + "    ");
  }
};
