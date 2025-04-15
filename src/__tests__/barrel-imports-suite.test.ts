import * as fs from "fs";
import * as path from "path";
import * as helperExports from "..";

// Fix TS implicit any for accessing helperExports keys
interface HelperExports {
  [key: string]: Function;
}

// Function to recursively get all .ts files
function getAllTsFiles(dir: string): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item !== "__tests__") {
      files.push(...getAllTsFiles(fullPath));
    } else if (stat.isFile() && item.endsWith(".ts") && item !== "index.ts") {
      files.push(fullPath);
    }
  }

  return files;
}

function hasTSDoc(filePath: string): boolean {
  const content = fs.readFileSync(filePath, "utf-8");
  // Match JSDoc/TSDoc style comments that come before an export
  const tsDocPattern = /\/\*\*[\s\S]*?\*\/\s*export/;
  return tsDocPattern.test(content);
}

const helpersDir = path.resolve(__dirname, "..");
const tsFiles = getAllTsFiles(helpersDir);

describe("Barrel test suite", () => {
  describe("Barrel imports", () => {
    it("should export all helper functions", () => {
      const exportedFunctions = Object.keys(helperExports);

      // Get expected exports from file names
      const expectedExports = tsFiles
        .map((file) => {
          const baseName = path.basename(file, ".ts");
          return baseName;
        })
        .flat();

      // Check that all expected exports exist
      for (const expectedExport of expectedExports) {
        expect(exportedFunctions).toContain(expectedExport);
        expect(typeof (helperExports as HelperExports)[expectedExport]).toBe(
          "function",
        );
      }

      // Check that there are no unexpected exports
      expect(exportedFunctions.length).toBe(expectedExports.length);
    });
  });

  describe("TSDoc documentation", () => {
    tsFiles.forEach((file) => {
      const fileName = path.basename(file);
      it(`${fileName} should have TSDoc comments`, () => {
        const hasDoc = hasTSDoc(file);
        expect(`${fileName} should have TSDoc comments`).toBe(
          hasDoc
            ? `${fileName} should have TSDoc comments`
            : `${fileName} is missing TSDoc comments`,
        );
      });
    });
  });
});
