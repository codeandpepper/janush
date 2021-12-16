import { Primitive } from "types/types/primitive";
import { toReadableArrayString } from "../../helpers/toReadableArrayString/toReadableArrayString";

export const toIncludeEvery = (tested: Primitive[], expected: Primitive[]) => {
  const diff: Primitive[] = [];

  const pass = expected
    .map((v: Primitive) => {
      const ok = tested.includes(v);

      if (!ok) {
        diff.push(v);
      }

      return ok;
    })
    .every(Boolean);

  return {
    pass,
    message: () =>
      pass
        ? "Expected array to include all of the elements."
        : [
            "Expected array to include all of the elements.\n",
            `Diff: ${toReadableArrayString(diff)}`,
          ].join(""),
  };
};
