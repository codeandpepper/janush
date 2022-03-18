import { toReadableArrayString } from "./toReadableArrayString";

describe("toReadableArrayString", () => {
  it("should match snapshot", () => {
    expect(toReadableArrayString(["Hello", "from", "test"])).toMatchInlineSnapshot(`
      "[
      	Hello,
      	from,
      	test
      ]
      "
    `);
  });
});
