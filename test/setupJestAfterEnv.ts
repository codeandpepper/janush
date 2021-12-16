import { Primitive } from "types/types/primitive";
import { toHaveEqualElements } from "./matchers/toHaveEqualElements/toHaveEqualElements";
import { toIncludeSome } from "./matchers/toIncludeSome/toIncludeSome";
import { toIncludeEvery } from "./matchers/toIncludeEvery/toIncludeEvery";

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Checks, if 2 arrays have got exactly same primitive elements (primitives only).
       *
       * Useful for check, if schematics has created exactly same list of files as expected (ignores order).
       */
      toHaveEqualElements(expected: Primitive[]): R;
      /**
       * Checks, if an array includes some items specified as an argument.
       *
       * Useful for check, if schematics **does NOT** create any not expected files.
       */
      toIncludeSome(expected: Primitive[]): R;
      /**
       * Checks, if an array includes every item specified as an argument.
       *
       * Useful for check, if schematics has created expected files.
       */
      toIncludeEvery(expected: Primitive[]): R;
    }
  }
}

expect.extend({
  toHaveEqualElements,
  toIncludeSome,
  toIncludeEvery,
});
