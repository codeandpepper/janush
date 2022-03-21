import { toHaveEqualElements } from "./toHaveEqualElements";

describe("toHaveEqualElements", () => {
  it("should pass with specific message", () => {
    const tested = ["a", "b", "c"];
    const expected = ["a", "b", "c"];

    const { pass, message: messageCallback } = toHaveEqualElements(tested, expected);

    expect(pass).toBe(true);
    expect(messageCallback()).toBe("Expected arrays to have same elements.");
  });

  it("should fail with specific message", () => {
    const tested = ["a", "b", "c", "d"];
    const expected = ["a", "b", "c", "e"];

    const { pass, message: messageCallback } = toHaveEqualElements(tested, expected);

    expect(pass).toBe(false);
    expect(messageCallback()).toMatchInlineSnapshot(`
      "Expected arrays to have same elements.
      Tested: [
      	a,
      	b,
      	c,
      	d
      ]
      Expected: [
      	a,
      	b,
      	c,
      	e
      ]
      Diff: [
      	d,
      	e
      ]
      "
    `);
  });
});
