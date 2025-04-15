import { kebabToCamel } from "../kebabToCamel";

describe("kebabToCamel", () => {
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
