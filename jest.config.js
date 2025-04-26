/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/lib/", "/dist/"],
};
