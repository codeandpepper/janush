import { UserGroups } from "@enums/Module";

export interface Schema {
  name: string;
  userGroups: UserGroups[];
  defaultGroups: boolean;
}
