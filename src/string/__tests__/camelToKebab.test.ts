import { camelToKebab } from "../camelToKebab";

export function camelToKebabTests() {
  describe("camelToKebab", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(camelToKebab("testString")).toBe("test-string");
      expect(camelToKebab("multipleWordString")).toBe("multiple-word-string");
    });

    it("should handle string with no capital letters", () => {
      expect(camelToKebab("test")).toBe("test");
    });

    it("should handle empty string", () => {
      expect(camelToKebab("")).toBe("");
    });

    it("should handle consecutive capital letters", () => {
      expect(camelToKebab("testABCString")).toBe("test-a-b-c-string");
    });

    it("should preserve numbers", () => {
      expect(camelToKebab("test123String")).toBe("test123-string");
    });

    it("should handle string starting with capital letter", () => {
      expect(camelToKebab("TestString")).toBe("test-string");
    });
  });
}
