/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/*-suite.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
};
