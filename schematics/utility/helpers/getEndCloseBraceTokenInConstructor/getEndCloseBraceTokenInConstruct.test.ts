import { createSourceFile, ScriptTarget } from "typescript";

import { getEndCloseBraceTokenInConstructor } from "./getEndCloseBraceTokenInConstructor";

describe("getEndCloseBraceTokenInConstructor", () => {
  it("should return an object", () => {
    const sourceFile = createSourceFile(
      "dummyName",
      `export class Dummy {
        constructor() {}
      }`,
      ScriptTarget.Latest,
      true,
    );

    expect(getEndCloseBraceTokenInConstructor(sourceFile)).toBeInstanceOf(Object);
  });

  it("should throw an error", () => {
    const sourceFile = createSourceFile(
      "dummyName",
      "export class Dummy {}",
      ScriptTarget.Latest,
      true,
    );

    expect(() => getEndCloseBraceTokenInConstructor(sourceFile)).toThrowError(
      "It is impossible to add construct to your stack.",
    );
  });
});
