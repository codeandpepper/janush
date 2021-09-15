import { Schematic } from "@enums/Schematic";

export interface Schema {
  name: string;
  skipInstall: boolean;
  types: Schematic[];
}
