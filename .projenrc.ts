import { ReleasableCommits, typescript } from "projen";
import { NodePackageManager, NpmAccess } from "projen/lib/javascript";
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "TypeScript Helpers",
  packageName: "TypeScript Helpers",

  projenrcTs: true,
  packageManager: NodePackageManager.NPM,
  authorName: "Ben Moses",
  description: "Helper libraries for TypeScript",
  repository: "https://github.com/benjymoses/helpers",
  keywords: ["typescript", "helper", "helpers"],
  devDeps: ["ts-node", "eslint"],

  depsUpgrade: true,

  npmTokenSecret: "NPM_TOKEN",
  npmAccess: NpmAccess.PUBLIC,

  githubOptions: {
    pullRequestLintOptions: {
      contributorStatement:
        "By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of the project license.",
      contributorStatementOptions: {
        exemptUsers: ["benjymoses", "github-actions"],
      },
    },
  },

  pullRequestTemplateContents:
    `## What type of PR is this? (check all applicable)

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

    `.split(/\r?\n/),

  licensed: true,
  license: "MIT",

  gitignore: [".DS_Store", "node_modules/", "dist/", ".vscode"],

  stability: "experimental",
  releasableCommits: ReleasableCommits.featuresAndFixes(),
});

project.synth();
