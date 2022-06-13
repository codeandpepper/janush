import { Auth } from "aws-amplify";
import { useMemo, useState, VFC } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { GENERAL_ERROR_MESSAGE } from "@consts/index";
import { Paths } from "@routing/paths";
import { isCognitoError } from "@utils/isCognitoError/isCognitoError";

import { ResetPasswordFormState } from "./ResetPasswordView/ResetPasswordForm/formState";
import { ResetPasswordView } from "./ResetPasswordView/ResetPasswordView";

const ResetPassword: VFC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { search } = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  const username = queryParams.get("username");
  const code = queryParams.get("code");

  const onResetPassword = async ({ password }: ResetPasswordFormState) => {
    setIsLoading(true);
    try {
      await Auth.forgotPasswordSubmit(username!, code!, password);
      navigate(Paths.SIGN_IN_PATH);
    } catch (err: unknown) {
      setError(isCognitoError(err) ? err.message : GENERAL_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  if (!username || !code) return <Navigate to={Paths.BASE} replace />;

  return (
    <ResetPasswordView
      onSubmit={onResetPassword}
      loading={isLoading}
      error={error}
    />
  );
};

export default ResetPassword;
