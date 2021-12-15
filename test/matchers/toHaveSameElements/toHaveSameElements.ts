import xor from "lodash.xor";
import isEmpty from "lodash.isempty";
import { Primitive } from "types/types/primitive";

const toReadableArrayString = (arr: Primitive[]) =>
  `[\n${arr.map((item) => `\t${item}`).join(",\n")}\n]\n`;

export const toHaveSameElements = (
  tested: Primitive[],
  expected: Primitive[]
) => {
  const diff = xor(tested, expected);
  const pass = isEmpty(diff);

  return {
    pass,
    message: () =>
      pass
        ? "Expected arrays to have same elements."
        : [
            "Expected arrays to have same elements.\n",
            `Tested: ${toReadableArrayString(tested)}`,
            `Expected: ${toReadableArrayString(expected)}`,
            `Diff: ${toReadableArrayString(diff)}`,
          ].join(""),
  };
};
