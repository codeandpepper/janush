import { Auth } from "aws-amplify";
import { useState, VFC } from "react";
import { useHistory } from "react-router-dom";

import { CognitoError } from "@interfaces/Cognito";
import { CognitoErrorType } from "@janush-types/enums/Cognito";
import { Nullable } from "@janush-types/useful";
import { Paths } from "@routing/paths";
import { SignUpFormState } from "@routing/routes/SignUp/SignUpView/SignUpForm/formState";
import { isCognitoError } from "@utils/isCognitoError/isCognitoError";

import { SignUpView } from "./SignUpView/SignUpView";

const SignUp: VFC = () => {
  const history = useHistory();
  const [error, setError] = useState<Nullable<CognitoError>>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSignUp = async ({ email, password }: SignUpFormState) => {
    if (loading) return;

    setLoading(true);

    const lowerCaseEmail = email.toLowerCase();

    try {
      await Auth.signUp({
        password,
        username: lowerCaseEmail,
        attributes: {
          email: lowerCaseEmail,
        },
      });

      history.push(Paths.VERIFY_EMAIL_PATH, {
        email,
      });
    } catch (err: unknown) {
      if (isCognitoError(err)) {
        if (err.code === CognitoErrorType.UsernameExistsException) {
          return setError({
            type: CognitoErrorType.UsernameExistsException,
            message: err.message,
          });
        }
      }

      /**
       * Cognito error messages are not user-friendly
       */
      setError({
        type: CognitoErrorType.Default,
        message: "Something went wrong. Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return <SignUpView loading={loading} onSignUp={onSignUp} error={error} />;
};

export default SignUp;
