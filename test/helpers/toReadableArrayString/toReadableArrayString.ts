import { Primitive } from "types/types/primitive";

export const toReadableArrayString = (arr: Primitive[]) =>
  `[\n${arr.map((item) => `\t${item}`).join(",\n")}\n]\n`;
