import isEmpty from "lodash.isempty";
import xor from "lodash.xor";

import { Primitive } from "types/types/primitive";

import { toReadableArrayString } from "../../helpers/toReadableArrayString/toReadableArrayString";

export const toHaveEqualElements = (tested: Primitive[], expected: Primitive[]) => {
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
