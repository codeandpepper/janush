import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { getSourceNodes } from "@schematics/angular/utility/ast-utils";
import { Change, InsertChange } from "@schematics/angular/utility/change";
import ts from "typescript";

function modifyCommandTs(tree: Tree): Change {
  const fileRawContent = tree.read("web/cypress/support/commands.ts");

  if (!fileRawContent) throw new SchematicsException(`File does not exist.`);

  const fileFormattedContent = fileRawContent.toString("utf-8");
  const sourceFile = ts.createSourceFile(
    "commands.ts",
    fileFormattedContent,
    ts.ScriptTarget.Latest,
    true
  );
  const nodes: ts.Node[] = getSourceNodes(sourceFile);
  const insertionNode = nodes.find(
    (node) =>
      node.kind === ts.SyntaxKind.ImportDeclaration &&
      node.getText().includes("./methods/base-commands")
  );

  if (!insertionNode)
    throw new SchematicsException(`insertion node not retrieved!`);

  const contentToInsert = `
  import "./methods/auth-commands";
  import "./methods/aws-calls";
  `;

  return new InsertChange(
    "web/cypress/support/commands.ts",
    insertionNode.getEnd(),
    contentToInsert
  );
}

export default modifyCommandTs;
