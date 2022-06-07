import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { VFC } from "react";
import { Controller, useForm } from "react-hook-form";

import { EmailField } from "@components/EmailField/EmailField";
import { ErrorMessage } from "@components/ErrorMessage/ErrorMessage";

import { ForgotPasswordFormState } from "./formState";
import { forgotPasswordFormValidationSchema } from "./formValidationSchema";

interface Props {
  onSubmit(formData: ForgotPasswordFormState): void;
  loading: boolean;
  error?: string;
}

const defaultValues = {
  email: "",
};

export const ForgotPasswordForm: VFC<Props> = ({
  onSubmit,
  error,
  loading,
}) => {
  const { handleSubmit, control } = useForm<ForgotPasswordFormState>({
    defaultValues,
    resolver: yupResolver(forgotPasswordFormValidationSchema()),
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <EmailField
            onChange={field.onChange}
            errorMessage={fieldState.error?.message}
            autoComplete="email"
            autoFocus
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
          {loading ? <CircularProgress size={20} color="inherit" /> : "Send"}
        </Button>
      </Box>
    </Box>
  );
};
