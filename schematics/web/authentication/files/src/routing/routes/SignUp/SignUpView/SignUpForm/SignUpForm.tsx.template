import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { Form } from "@components/Form/Form";
import { EmailField } from "@components/EmailField/EmailField";
import { PasswordField } from "@components/PasswordField/PasswordField";
import { CognitoError } from "@interfaces/Cognito";
import { CognitoErrorType } from "@janush-types/enums/Cognito";
import { Nullable } from "@janush-types/useful";
import { SignUpFormState } from "./formState";
import { formValidationSchema } from "./formValidationSchema";

import { useStyles } from "./styles";

const defaultValues: SignUpFormState = {
  email: "",
  password: "",
  confirmPassword: "",
};

interface Props {
  loading: boolean;
  onSubmit(formData: SignUpFormState): void;
  error: Nullable<CognitoError>;
}

export const SignUpForm: React.FC<Props> = ({ loading, onSubmit, error }) => {
  const classes = useStyles();

  const { control, handleSubmit, formState, setError } =
    useForm<SignUpFormState>({
      resolver: yupResolver(formValidationSchema()),
      defaultValues,
    });

  useEffect(() => {
    switch (error?.type) {
      case CognitoErrorType.UsernameExistsException:
        setError("email", {
          type: "manual",
          message: error.message,
        });
        break;

      default:
        break;
    }
  }, [error, setError]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <EmailField
            onChange={field.onChange}
            autoComplete="email"
            errorMessage={formState.errors.email?.message}
            autoFocus
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordField
            onChange={field.onChange}
            errorMessage={formState.errors.password?.message}
            ariaControls="password"
            label="Password"
            placeholder="Password"
            autoComplete="new-password"
            dataTestId="password"
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <PasswordField
            onChange={field.onChange}
            errorMessage={formState.errors.confirmPassword?.message}
            ariaControls="confirm-password"
            label="Confirm Password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            dataTestId="confirm-password"
          />
        )}
      />
      {error?.type === CognitoErrorType.Default && (
        <Typography color="error" align="center" mt={1} fontSize={14}>
          {error.message}
        </Typography>
      )}
      <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
        <Button
          color="primary"
          type="submit"
          data-testid="sign-up-button"
          variant="contained"
          disabled={loading}
          fullWidth
        >
          Sign up
        </Button>
        {loading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )}
      </Box>
    </Form>
  );
};
