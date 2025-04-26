import * as fs from "fs";
import * as ts from "typescript";
import * as path from "path";
import * as helperExports from "../src";

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

    if (stat.isDirectory()) {
      files.push(...getAllTsFiles(fullPath));
    } else if (
      stat.isFile() &&
      item.endsWith(".ts") &&
      item !== "index.ts" &&
      !item.endsWith(".d.ts")
    ) {
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

const helpersDir = path.resolve(__dirname, "../src");
const tsFiles = getAllTsFiles(helpersDir);
const exportedFunctions = Object.keys(helperExports);

// Get expected exports from TS files
const expectedExports = tsFiles
  .map((file) => {
    const filePath = path.resolve(file);
    const sourceCode = fs.readFileSync(filePath, "utf-8");
    const sourceFile = ts.createSourceFile(
      filePath,
      sourceCode,
      ts.ScriptTarget.Latest,
      true
    );

    const exports: string[] = [];

    sourceFile.forEachChild((node) => {
      if (
        ts.isExportDeclaration(node) &&
        node.exportClause &&
        ts.isNamedExports(node.exportClause)
      ) {
        node.exportClause.elements.forEach((el) => {
          exports.push(el.name.text);
        });
      } else if (
        ts.isFunctionDeclaration(node) &&
        node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      ) {
        if (node.name) {
          exports.push(node.name.text);
        }
      } else if (
        ts.isVariableStatement(node) &&
        node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      ) {
        node.declarationList.declarations.forEach((decl) => {
          if (ts.isIdentifier(decl.name)) {
            exports.push(decl.name.text);
          }
        });
      } else if (
        ts.isClassDeclaration(node) &&
        node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      ) {
        if (node.name) {
          exports.push(node.name.text);
        }
      } else if (
        ts.isInterfaceDeclaration(node) &&
        node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      ) {
        if (node.name) {
          exports.push(node.name.text);
        }
      } else if (
        ts.isTypeAliasDeclaration(node) &&
        node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      ) {
        if (node.name) {
          exports.push(node.name.text);
        }
      }
    });

    return exports;
  })
  .flat();

describe("Barrel test suite", () => {
  describe("Barrel imports", () => {
    it("should export all helper functions", () => {
      // Check that all expected exports exist
      for (const expectedExport of expectedExports) {
        expect(exportedFunctions).toContain(expectedExport);
        expect(typeof (helperExports as HelperExports)[expectedExport]).toBe(
          "function"
        );
      }
    });

    it("should only export expected items", () => {
      // Check that there are no unexpected exports
      expect(exportedFunctions.length).toBe(expectedExports.length);
    });
  });

  describe("TSDoc documentation", () => {
    tsFiles.forEach((file) => {
      if (path.basename(file) === "prototypes.ts") return; // prototype barrel imports won't have TSDoc

      it(`${file} should have TSDoc comments`, () => {
        const hasDoc = hasTSDoc(file);
        expect(`${file} should have TSDoc comments`).toBe(
          hasDoc
            ? `${file} should have TSDoc comments`
            : `${file} is missing TSDoc comments`
        );
      });
    });
  });
});
