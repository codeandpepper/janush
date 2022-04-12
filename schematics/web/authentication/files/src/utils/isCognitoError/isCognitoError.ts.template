/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CognitoError } from "@interfaces/Cognito";
import { CognitoErrorType } from "@janush-types/enums/Cognito";

export const isCognitoError = (err: any): err is CognitoError =>
  Object.values(CognitoErrorType).includes(err.code);
