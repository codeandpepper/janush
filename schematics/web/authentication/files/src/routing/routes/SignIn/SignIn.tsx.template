import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

import { Paths } from "@routing/paths";
import { SignInView } from "@routing/routes/SignIn/SignInView/SignInView";
import { SignInFormState } from "./SignInView/SignInForm/SignInFormState";

const SignIn: React.VFC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSignIn = async ({ email, password }: SignInFormState) => {
    try {
      setLoading(true);
      setError("");

      await Auth.signIn({
        password,
        username: email.trim().toLowerCase(),
      });

      history.push(Paths.BASE, {
        email,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code === "NotAuthorizedException") {
        return setError("Incorrect email or password");
      }

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <SignInView error={error} loading={loading} onSignIn={onSignIn} />;
};

export default SignIn;
