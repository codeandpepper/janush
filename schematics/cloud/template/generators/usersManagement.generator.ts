import { schematic } from "@angular-devkit/schematics";

import { CloudSchematic } from "@enums/Schematic";

import { Schema } from "../schema";

export class UsersManagementGenerator {
  private readonly options: Schema;

  constructor(options: Schema) {
    this.options = options;
  }

  generate = (): void => {
    schematic(CloudSchematic.USERS_MANAGEMENT_CREATE_GROUPS, this.options);
    schematic(CloudSchematic.USERS_MANAGEMENT_GET_GROUPS, this.options);
  };
}
