import { string } from "yup";
import StringSchema from "yup/lib/string";

import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "../../consts";

export const passwordValidation = (): StringSchema<
  string | undefined,
  Record<string, unknown>,
  string | undefined
> =>
  string()
    .required("Password is a required field")
    .matches(/[a-z]/, "Your password should contain lower case letters")
    .matches(/[A-Z]/, "Your password should contain upper case letters")
    .matches(/\d/, "Your password should contain digits")
    .min(
      MIN_PASSWORD_LENGTH,
      "Your password should contain at least 10 characters"
    )
    .max(MAX_PASSWORD_LENGTH, "Your password is too long, max. 80 characters");
