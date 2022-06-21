import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState, VFC } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Form } from "@components/Form/Form";
import { TextField } from "@components/TextField/TextField";
import { Paths } from "@routing/paths";
import { isCognitoError } from "@utils/isCognitoError/isCognitoError";

interface IProps {
  email: string;
  code: string;
}

interface IVerifyEmailState {
  codeValue: string;
}

export const VerifyEmailForm: VFC<IProps> = ({ email, code }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { handleSubmit, control } = useForm<IVerifyEmailState>({
    defaultValues: {
      codeValue: code,
    },
  });

  const submit = async ({ codeValue }: IVerifyEmailState) => {
    try {
      await Auth.confirmSignUp(email, codeValue);

      navigate(Paths.SIGN_IN_PATH);
    } catch (err: unknown) {
      if (isCognitoError(err)) {
        setMessage(err.message);
      } else {
        setMessage("Oops... Something went wrong");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        name="codeValue"
        control={control}
        render={({ field }) => (
          <TextField
            onChange={field.onChange}
            autoComplete="codeValue"
            inputProps={{ "data-testid": "verification-code-input" }}
            autoFocus
            label="Verification code"
            error={!!message}
            helperText={message}
            defaultValue={code}
          />
        )}
      />
      <Button
        data-testid="verify-code"
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Verify code
      </Button>
    </Form>
  );
};
