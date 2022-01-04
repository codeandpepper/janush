import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

import { Paths } from "@routing/paths";
import { useQuery } from "@utils/hooks/useQuery";

const ConfirmSignUp = (): JSX.Element => {
  const [message, setMessage] = useState("Please wait...");
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        await Auth.confirmSignUp(
          query.get("username") as string,
          query.get("code") as string
        );

        history.push(Paths.SIGN_IN_PATH);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setMessage(err.message);
      }
    })();
  }, []);

  return <div>{message}</div>;
};

export default ConfirmSignUp;
