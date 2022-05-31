import { object, SchemaOf } from "yup";

import {
  confirmPasswordValidation,
  passwordValidation,
} from "@utils/validation/passwordValidation";

import { ResetPasswordFormState } from "./formState";

export const resetPasswordFormValidationSchema =
  (): SchemaOf<ResetPasswordFormState> =>
    object({
      password: passwordValidation(),
      confirmPassword: confirmPasswordValidation(),
    }) as SchemaOf<ResetPasswordFormState>;
