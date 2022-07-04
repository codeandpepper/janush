import { IdentityProviders, UsersManagement } from "@enums/Module";

export interface Schema {
  name: string;
  timeStamp: string;
  emails: boolean;
  idP: IdentityProviders[];
  usersManagement: UsersManagement[];
  isFacebook: boolean;
  isGoogle: boolean;
  isApple: boolean;
  defaultGroups: boolean;
}
