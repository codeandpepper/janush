import { readJson } from "@janush-schematics/utility/jsonFilesUtils";

describe("jsonFilesUtils", () => {
  describe("readJson", () => {
    it("should return text -> Content of read json", () => {
      const pathToJsonFile = "test/utility/mocks/readJson.json";
      const expected = "Content of read json";

      expect(readJson<{ content: string }>(pathToJsonFile).content).toBe(expected);
    });

    it("should throw an exception when path is wrong or file does not exists", () => {
      const pathToJsonFile = "test/utility/mocks/nonexistentFile.json";

      expect(() => readJson<{ content: string }>(pathToJsonFile).content).toThrow();
    });
  });
});
