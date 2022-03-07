import {
  getCurrentWorkingDirectory,
  getDirectoryOfFileFromPath,
  trimPathToDirectoryName,
} from "@janush-schematics/utility/directoryUtils";
import path from "path";

describe("directoryUtils", () => {
  describe("trimPathToDirectoryName", () => {
    it("trimming to inner directory in path should return path => /users/kowalski", () => {
      const pathToBeTrimmed = "/users/kowalski/documents/books";
      const directoryName = "kowalski";

      expect(trimPathToDirectoryName(pathToBeTrimmed, directoryName)).toBe(
        "/users/kowalski"
      );
    });

    it("trimming to last directory in path should return path => /users/kowalski/documents/books", () => {
      const pathToBeTrimmed = "/users/kowalski/documents/books";
      const directoryName = "books";

      expect(trimPathToDirectoryName(pathToBeTrimmed, directoryName)).toBe(
        "/users/kowalski/documents/books"
      );
    });

    it("trimming to directory that do not exists in path should throw an Exception", () => {
      const pathToBeTrimmed = "/users/kowalski/documents/books";
      const directoryName = "malinowski";

      expect(() =>
        trimPathToDirectoryName(pathToBeTrimmed, directoryName)
      ).toThrow();
    });
  });
  describe("getCurrentWorkingDirectory", () => {
    it("should return string", () => {
      expect(typeof getCurrentWorkingDirectory()).toBe("string");
    });
  });
  describe("getDirectoryOfFileFromPath", () => {
    const expectedPath = path.join(__dirname, "..", "..");

    it(`should return path ${expectedPath}`, () => {
      const fileName = "package.json";

      expect(getDirectoryOfFileFromPath(__dirname, fileName)).toBe(
        expectedPath
      );
    });

    it("should return empty string", () => {
      const fileName = "nonexistentFile.json";

      expect(getDirectoryOfFileFromPath(__dirname, fileName)).toBe("");
    });
  });
});
