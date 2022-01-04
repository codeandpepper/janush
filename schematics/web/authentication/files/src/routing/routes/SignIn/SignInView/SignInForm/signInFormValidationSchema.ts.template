import { object, SchemaOf, string } from "yup";

import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from "@consts/index";
import { validateMaxStringLength } from "@utils/validation/validateMaxStringLength";
import { SignInFormState } from "./SignInFormState";

export const signInFormValidationSchema = (): SchemaOf<SignInFormState> =>
  <SchemaOf<SignInFormState>>object({
    email: string()
      .required("Email is a required field")
      .email("Email is not correct")
      .test("Maximum email length", "Email too long", (v) =>
        validateMaxStringLength(v, MAX_EMAIL_LENGTH)
      ),
    password: string()
      .required("Password is a required field")
      .test("Maximum password length", "Password too long", (v) =>
        validateMaxStringLength(v, MAX_PASSWORD_LENGTH)
      ),
  });
