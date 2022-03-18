import ts from "typescript";

import { getEndCloseBraceTokenInConstructor } from "./getEndCloseBraceTokenInConstructor";

describe("getEndCloseBraceTokenInConstructor", () => {
  it("should return an object", () => {
    const sourceFile = ts.createSourceFile(
      "dummyName",
      `export class Dummy {
        constructor() {}
      }`,
      ts.ScriptTarget.Latest,
      true,
    );

    expect(getEndCloseBraceTokenInConstructor(sourceFile)).toBeInstanceOf(Object);
  });

  it("should throw an error", () => {
    const sourceFile = ts.createSourceFile(
      "dummyName",
      "export class Dummy {}",
      ts.ScriptTarget.Latest,
      true,
    );

    expect(() => getEndCloseBraceTokenInConstructor(sourceFile)).toThrowError(
      "It is impossible to add construct to your stack.",
    );
  });
});
