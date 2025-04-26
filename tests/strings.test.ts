import { camelToKebab, capital, kebabToCamel } from "../src/strings";

import "../src/strings/prototypes";

describe("String Helpers test suite", () => {
  describe("camelToKebab()", () => {
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

  describe("capital()", () => {
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

  describe("kebabToCamel()", () => {
    it("should convert kebab-case to camelCase", () => {
      expect(kebabToCamel("test-string")).toBe("testString");
      expect(kebabToCamel("multiple-word-string")).toBe("multipleWordString");
    });

    it("should handle string with no hyphens", () => {
      expect(kebabToCamel("test")).toBe("test");
    });

    it("should handle empty string", () => {
      expect(kebabToCamel("")).toBe("");
    });

    it("should handle consecutive hyphens", () => {
      expect(kebabToCamel("test--string")).toBe("testString");
    });

    it("should preserve numbers", () => {
      expect(kebabToCamel("test-123-string")).toBe("test123String");
    });
  });
});

describe("String prototype extensions", () => {
  it("camelToKebab should be callable and return as expected", () => {
    expect("myTestString".camelToKebab()).toBe("my-test-string");
  });

  it("capital should be callable and return as expected", () => {
    expect("hello".capital()).toBe("Hello");
  });

  it("kebabToCamel should be callable and return as expected", () => {
    expect("my-test-string".kebabToCamel()).toBe("myTestString");
  });
});
