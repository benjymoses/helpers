import { capital } from "../capital";

export function capitalTests() {
  describe("capital", () => {
    it("should capitalize the first letter of a string", () => {
      expect(capital("test")).toBe("Test");
      expect(capital("hello world")).toBe("Hello world");
    });

    it("should handle empty string", () => {
      expect(capital("")).toBe("");
    });

    it("should handle single character", () => {
      expect(capital("a")).toBe("A");
    });

    it("should not modify already capitalized strings", () => {
      expect(capital("Test")).toBe("Test");
      expect(capital("TEST")).toBe("TEST");
    });

    it("should handle strings starting with numbers", () => {
      expect(capital("123test")).toBe("123test");
    });
  });
}
