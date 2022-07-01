import { IdentityProviders } from "@enums/Module";

import { Schema as AppSchema } from "../../application/schema";

export interface Schema extends Partial<AppSchema> {
  userManagement: boolean;
  idP: IdentityProviders[];
}
