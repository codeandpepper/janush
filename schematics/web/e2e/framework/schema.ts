import { E2ERunner } from "@enums/Module";

import { Schema as WebTemplateSchema } from "../../template/schema";

export interface Schema extends WebTemplateSchema {
  e2eModule: E2ERunner;
}
