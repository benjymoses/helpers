import { ReleasableCommits, typescript } from "projen";
import { NodePackageManager, NpmAccess } from "projen/lib/javascript";

import * as fs from "fs";
import * as path from "path";

const prTemplate = `## What type of PR is this? (check all applicable)

- [ ] Refactor
- [ ] Feature

## Description

## Related Issues
- Related Issue #
- Closes #

## Instructions, Screenshots, etc
_Please replace this line with instructions on how to test your changes._

## Added/updated tests
_We encourage you to keep the code coverage percentage at 80% and above._

- [ ] Yes
- [ ] No, and this is why: _please replace this line with details on why tests have not been included_
- [ ] I need help with writing tests

## [optional] Are there any post deployment tasks we need to perform?

    `.split(/\r?\n/);

const project = new typescript.TypeScriptProject({
  name: "TypeScript Helpers",
  packageName: "@benjymoses/helpers",
  packageManager: NodePackageManager.NPM,
  authorName: "Ben Moses",
  description: "Helper libraries for TypeScript",
  repository: "https://github.com/benjymoses/helpers",
  keywords: ["typescript", "helper", "helpers"],
  projenrcTs: true,
  licensed: true,
  license: "MIT",

  tsconfig: {
    compilerOptions: {
      baseUrl: ".",
      paths: {
        "*": ["node_modules/*", "src/*"],
      },
    },
  },

  stability: "experimental",
  defaultReleaseBranch: "main",
  releasableCommits: ReleasableCommits.featuresAndFixes(),

  depsUpgrade: true,
  pullRequestTemplateContents: prTemplate,

  npmTokenSecret: "NPM_TOKEN",
  npmAccess: NpmAccess.PUBLIC,
  releaseToNpm: true,
  release: true,
  githubOptions: {
    pullRequestLintOptions: {
      contributorStatement:
        "By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of the project license.",
      contributorStatementOptions: {
        exemptUsers: ["benjymoses", "github-actions"],
      },
    },
    mergifyOptions: {
      rules: [
        {
          name: "Auto-merge UpgradeMain PRs",
          actions: {
            merge: {
              method: "squash",
              commit_message_template:
                "Squashed commit for PR #{{number}}: {{title}} from upgrade-main workflow.",
            },
            delete_head_branch: {},
          },
          conditions: [
            "author=benjymoses",
            "status-success=build",
            "head=github-actions/upgrade-main",
          ],
        },
      ],
    },
  },

  sampleCode: false,
  jest: false,

  gitignore: [
    ".DS_Store",
    "node_modules/",
    "dist/",
    ".vscode",
    "coverage",
    "lib",
    "test-reports",
    "tsconfig.tsbuildinfo",
    "coverage/",
  ],

  devDeps: [
    "ts-node",
    "eslint",
    "@types/jest",
    "@types/node",
    "jest",
    "ts-jest",
    "typescript",
  ],
});

project.eslint?.addRules({
  quotes: ["error", "double"],
});

project.addTask("test:coverage", {
  exec: "jest --coverage --coverageReporters='text' --coverageReporters='text-summary' --verbose",
});

project.testTask.reset();
project.testTask.exec("jest --config jest.config.js --rootDir ./");

const jestConfigPath = path.join(__dirname, "jest.config.js");
fs.writeFileSync(
  jestConfigPath,
  `/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/*-suite.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
};
`
);

project.synth();
