import { Schematic } from "@enums/Schematic";

export interface Schema {
  name: string;
  types: Schematic[];
  isAutoGenerated: boolean;
  skipInstall: boolean;
  version: boolean;
}
