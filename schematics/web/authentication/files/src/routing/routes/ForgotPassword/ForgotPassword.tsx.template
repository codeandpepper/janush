import { Auth } from "aws-amplify";
import { useState, VFC } from "react";

import { GENERAL_ERROR_MESSAGE } from "@consts/index";
import { isCognitoError } from "@utils/isCognitoError/isCognitoError";

import { ForgotPasswordFormState } from "./ForgotPasswordView/ForgotPasswordForm/formState";
import { ForgotPasswordView } from "./ForgotPasswordView/ForgotPasswordView";

const ForgotPassword: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onForgotPassword = async ({ email }: ForgotPasswordFormState) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await Auth.forgotPassword(email);
      setIsEmailSent(true);
    } catch (err: unknown) {
      setError(isCognitoError(err) ? err.message : GENERAL_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordView
      onForgotPassword={onForgotPassword}
      loading={isLoading}
      error={error}
      isEmailSent={isEmailSent}
    />
  );
};

export default ForgotPassword;
