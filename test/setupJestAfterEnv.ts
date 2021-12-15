import { Primitive } from "types/types/primitive";
import { toHaveSameElements } from "./matchers/toHaveSameElements/toHaveSameElements";

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveSameElements(expected: Primitive[]): R;
    }
  }
}

expect.extend({
  toHaveSameElements,
});
