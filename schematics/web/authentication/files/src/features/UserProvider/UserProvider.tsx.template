import { Auth, Hub } from "aws-amplify";
import { HubCallback } from "@aws-amplify/core";
import { createContext, FC, useCallback, useEffect, useState } from "react";
import { User } from "@interfaces/User";
import { HubEvent } from "@janush-types/enums/HubEvent";
import { Nullable } from "@janush-types/useful";

export interface UserContextValue {
  user?: Nullable<User>;
}

export const UserContext = createContext<UserContextValue>({
  user: undefined,
});

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<Nullable<User>>(null);

  const refreshUser = useCallback(async () => {
    try {
      const {
        payload: {
          email,
          email_verified: emailVerified,
          sub,
          "cognito:groups": groups,
        },
      } = (await Auth.currentSession()).getIdToken();
      setUser({
        email,
        emailVerified,
        sub,
        groups: groups || [],
      });
    } catch (e) {
      setUser(null);
    }
  }, []);

  const onHubCapsule: HubCallback = useCallback(
    async ({ payload: { event } }) => {
      switch (event as HubEvent) {
        case HubEvent.SignIn:
        case HubEvent.TokenRefresh:
          await refreshUser();
          break;
        case HubEvent.SignOut:
          setUser(null);
          break;
        default:
          break;
      }
    },
    []
  );

  useEffect(() => {
    (async () => {
      Hub.listen("auth", onHubCapsule);
      await refreshUser();
    })();

    return () => Hub.remove("auth", onHubCapsule);
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
