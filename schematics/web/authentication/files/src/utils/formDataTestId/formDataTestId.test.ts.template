import { formDataTestId } from "./formDataTestId";

describe("formDataTestId", () => {
  it("should return meaningful value", () => {
    expect(formDataTestId("field", "input")).toEqual("field-input");
  });

  it("should return an empty string", () => {
    expect(formDataTestId(undefined, "input")).toEqual("");
  });
});
