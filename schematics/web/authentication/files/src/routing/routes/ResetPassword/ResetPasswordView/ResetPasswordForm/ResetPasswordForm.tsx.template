import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { VFC } from "react";
import { Controller, useForm } from "react-hook-form";

import { ErrorMessage } from "@components/ErrorMessage/ErrorMessage";
import { PasswordField } from "@components/PasswordField/PasswordField";
import { CognitoError } from "@interfaces/Cognito";
import { Nullable } from "@janush-types/useful";

import { ResetPasswordFormState } from "./formState";
import { resetPasswordFormValidationSchema } from "./formValidationSchema";

const defaultValues: ResetPasswordFormState = {
  password: "",
  confirmPassword: "",
};

interface Props {
  onSubmit(formData: ResetPasswordFormState): void;
  loading?: boolean;
  error?: Nullable<CognitoError | string>;
}

export const ResetPasswordForm: VFC<Props> = ({ onSubmit, loading, error }) => {
  const { control, handleSubmit } = useForm<ResetPasswordFormState>({
    resolver: yupResolver(resetPasswordFormValidationSchema()),
    defaultValues,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <PasswordField
            onChange={field.onChange}
            errorMessage={fieldState.error?.message}
            ariaControls="password"
            label="Password"
            placeholder="Password"
            autoComplete="new-password"
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <PasswordField
            onChange={field.onChange}
            errorMessage={fieldState.error?.message}
            ariaControls="confirm-password"
            label="Confirm Password"
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
        )}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
