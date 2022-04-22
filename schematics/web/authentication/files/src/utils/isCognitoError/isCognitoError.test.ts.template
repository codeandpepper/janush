import { CognitoErrorType } from "@janush-types/enums/Cognito";

import { isCognitoError } from "./isCognitoError";

describe("isCognitoError", () => {
  it("should return true", () => {
    const correctObj = {
      type: CognitoErrorType.CodeMismatchException,
      message: "Example msg",
      code: CognitoErrorType.CodeMismatchException,
    };

    expect(isCognitoError(correctObj)).toBe(true);
  });

  it("should return false", () => {
    expect(isCognitoError("unexpected error")).toBe(false);
  });
});
