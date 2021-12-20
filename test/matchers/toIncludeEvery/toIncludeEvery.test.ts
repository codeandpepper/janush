import { toIncludeEvery } from "./toIncludeEvery";

describe("toIncludeEvery", () => {
  it("should pass with specific message", () => {
    const tested = ["a", "b", "c", "d"];
    const expected = ["a", "b", "c"];

    const { pass, message: messageCallback } = toIncludeEvery(tested, expected);

    expect(pass).toBe(true);
    expect(messageCallback()).toBe(
      "Expected array to include all of the elements."
    );
  });

  it("should fail with specific message", () => {
    const tested = ["a", "b", "c", "d"];
    const expected = ["a", "b", "c", "e", "f"];

    const { pass, message: messageCallback } = toIncludeEvery(tested, expected);

    expect(pass).toBe(false);
    expect(messageCallback()).toMatchInlineSnapshot(`
      "Expected array to include all of the elements.
      Diff: [
      	e,
      	f
      ]
      "
    `);
  });
});
