import { validateMaxStringLength } from "@utils/validation/validateMaxStringLength";
import { object, SchemaOf, string } from "yup";
import { ForgotPasswordFormState } from "./formState";
import { MAX_EMAIL_LENGTH } from "@consts/index";

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
