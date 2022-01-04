import { toIncludeSome } from "./toIncludeSome";

describe("toIncludeSome", () => {
  it("should pass with specific message", () => {
    const tested = ["a", "b", "c"];
    const expected = ["a"];

    const { pass, message: messageCallback } = toIncludeSome(tested, expected);

    expect(pass).toBe(true);
    expect(messageCallback()).toBe(
      "Expected array to include some of the elements."
    );
  });

  it("should fail with specific message", () => {
    const tested = ["a", "b", "c"];
    const expected = ["d"];

    const { pass, message: messageCallback } = toIncludeSome(tested, expected);

    expect(pass).toBe(false);
    expect(messageCallback()).toEqual(
      "Expected array to include some of the elements."
    );
  });
});
