import { useState, VFC } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

import { Paths } from "@routing/paths";
import { SignInView } from "@routing/routes/SignIn/SignInView/SignInView";
import { isCognitoError } from "@utils/isCognitoError/isCognitoError";

import { SignInFormState } from "./SignInView/SignInForm/SignInFormState";

const SignIn: VFC = () => {
  const navigate = useNavigate();
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

      navigate(Paths.BASE, {
        state: email,
      });
    } catch (err: unknown) {
      if (isCognitoError(err)) {
        if (err.code === "NotAuthorizedException") {
          return setError("Incorrect email or password");
        } else {
          return setError(err.message);
        }
      }

      setError("Oops... Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return <SignInView error={error} loading={loading} onSignIn={onSignIn} />;
};

export default SignIn;
