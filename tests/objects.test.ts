import { discoverArguments } from "../src/objects";

describe("Object test suite", () => {
  describe("discoverArguments", () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
    });

    it("should return a function", () => {
      const result = discoverArguments();
      expect(typeof result).toBe("function");
    });

    it("should log received arguments with default options", () => {
      const callback = discoverArguments();
      const result = callback("test", 123, true);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        " callback received: ",
        JSON.stringify(
          {
            numberOfArgs: 3,
            arguments: ["test: string", "123: number", "true: boolean"],
          },
          null,
          2
        )
      );
      expect(result).toBe("test"); // Should return first argument by default
    });

    it("should use custom label when provided", () => {
      const callback = discoverArguments({ label: "Test Label" });
      callback("test");

      expect(consoleLogSpy).toHaveBeenCalledWith(
        "Test Label callback received: ",
        expect.any(String)
      );
    });

    it("should return custom return value when provided", () => {
      const callback = discoverArguments({ returnValue: "custom" });
      const result = callback("test");
      expect(result).toBe("custom");
    });

    it("should work with String.replace", () => {
      const callback = discoverArguments();
      "camelCase".replace(/([a-z])([A-Z])/g, callback);

      expect(consoleLogSpy).toHaveBeenCalled();
      const logCall = consoleLogSpy.mock.calls[0];
      const loggedData = JSON.parse(logCall[1]);
      expect(loggedData.numberOfArgs).toBe(5); // match, p1, p2, offset, string
    });
  });
});
