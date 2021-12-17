import { Primitive } from "types/types/primitive";

export const toIncludeSome = (tested: Primitive[], expected: Primitive[]) => {
  const diff: Primitive[] = [];

  const pass = expected
    .map((v: Primitive) => {
      const ok = tested.includes(v);

      if (!ok) {
        diff.push(v);
      }

      return ok;
    })
    .some(Boolean);

  return {
    pass,
    message: () => "Expected array to include some of the elements.",
  };
};
