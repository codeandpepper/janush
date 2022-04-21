import { createSourceFile, ScriptTarget } from "typescript";

import { showTree } from "./showTree";

describe("showTree", () => {
  it("should log correct tree elements", () => {
    const showTreeOutput = (() => {
      const logs: string[] = [];
      jest.spyOn(console, "log").mockImplementation((logContent) => logs.push(logContent));

      createSourceFile(
        "dummyName",
        `const a = () => true;`,
        ScriptTarget.Latest,
        true,
      ).forEachChild((child) => {
        showTree(child);
      });

      return logs;
    })();

    expect(showTreeOutput.join("\n")).toMatchInlineSnapshot(`
      "    FirstStatement
              VariableDeclarationList
                  ConstKeyword
                      Text: const
                  SyntaxList
                      VariableDeclaration
                          Identifier
                              Text: a
                          FirstAssignment
                              Text: =
                          ArrowFunction
                              OpenParenToken
                                  Text: (
                              SyntaxList
                                  Text: 
                              CloseParenToken
                                  Text: )
                              EqualsGreaterThanToken
                                  Text: =>
                              TrueKeyword
                                  Text: true
              SemicolonToken
                  Text: ;
          EndOfFileToken
              Text: "
    `);
  });
});
