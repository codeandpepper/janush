import { object, SchemaOf, string } from "yup";

import { MAX_EMAIL_LENGTH } from "@consts/index";
import { validateMaxStringLength } from "@utils/validation/validateMaxStringLength";

import { ForgotPasswordFormState } from "./formState";

export const forgotPasswordFormValidationSchema =
  (): SchemaOf<ForgotPasswordFormState> =>
    object({
      email: string()
        .required("Email is a required field")
        .email("Email is not correct")
        .test("Maximum email length", "Email too long", (v) =>
          validateMaxStringLength(v, MAX_EMAIL_LENGTH)
        ),
    }) as SchemaOf<ForgotPasswordFormState>;
