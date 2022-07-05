import { IdentityProviders } from "@enums/Module";

export interface Schema {
  name: string;
  timeStamp: string;
  emails: boolean;
  idP: IdentityProviders[];
  isFacebook: boolean;
  isGoogle: boolean;
  isApple: boolean;
}
