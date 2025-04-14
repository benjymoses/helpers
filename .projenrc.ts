import { ReleasableCommits, typescript } from "projen";
import { NodePackageManager, NpmAccess } from "projen/lib/javascript";

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

  gitignore: [
    ".DS_Store",
    "node_modules/",
    "dist/",
    ".vscode",
    "coverage",
    "lib",
    "test-reports",
    "tsconfig.tsbuildinfo",
  ],

  devDeps: ["ts-node", "eslint"],
});

project.eslint?.addRules({
  quotes: ["error", "double"],
});

project.synth();
