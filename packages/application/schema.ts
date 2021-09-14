import { Schematic } from "../../types/enums/Schematic";

export interface Schema {
  name: string;
  skipInstall: boolean;
  types: Schematic[];
}
