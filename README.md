# Helpers
### An open source library of code helpers for TypeScript projects

<div align="center">
<img src="https://img.shields.io/github/license/benjymoses/helpers"/>
![GitHub Actions 'Build' Workflow Status](https://img.shields.io/github/actions/workflow/status/benjymoses/helpers/build.yml)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/benjymoses/helpers)

<!-- ![GitHub Actions 'upgrade-main' Workflow Status](https://img.shields.io/github/actions/workflow/status/benjymoses/helpers/upgrade-main.yml) -->
<!--![GitHub branch check runs](https://img.shields.io/github/check-runs/benjymoses/helpers/main) -->
<!-- ![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/benjymoses/helpers) -->
<!-- ![GitHub Open Pull Requests](https://img.shields.io/github/issues-pr/benjymoses/helpers) -->
</div>

It's common when writing TypeScript projects to re-use common helper functions, types, and utilities to turbo-charge your development. This collection of helper utilities is designed to be easy to import in to your project and give you quick access to meaingful helpers. The objective is to reduce re-creating or copy/pasting these types of helper for each project you work on.

---

## Helpers
This is a new project and helpers will be added iteratively over time. Check the list below for what's already there today, and some upcoming roadmap items. If you have ideas for useful helpers you'd like to see here, feel free to submit a PR, or open a feature request issue.

Each helper is self-documented with TSDoc for usage instructions and example implementations.

<!-- // TODO: links to PR and feature-request issue -->

### ✏️ String
#### **camelToKebab**
Function that takes a camelCase string and returns as a kebab string. 
```ts
camelToKebab("myString") // returns "my-string"
```

#### **capital**
Function that takes a string and returns the string with the first letter capitalised.
```ts
capital("hello") // returns "Hello"
```

#### **kebabToCamel**
Function that takes a kebab-case string and returns as a camelCase string.
```ts
kebabToCamel("my-string") // returns "myString"
```

### 🔧 Object
#### **discoverArguments**
Passed as a callback function where you may be unclear on what arguments the callback can receive, and console.logs a JSON object with the number of arguments received, and the key and type of each argument passed at runtime. Can be used to understand Map, Array, Replace callbacks and more. By default, the function returns the first element passed to it, but this can be overriden.
```ts
"helloWorld".replace(/[a-zA-Z]/g, discoverArguments()) 

// console.log for each match in the RegEx:
```json
callback received:  {
  "numberOfArgs": 3,
  "arguments": [
    "h: string",
    "0: number",
    "helloWorld: string"
  ]
}
```

Optionally you can pass an `options` object to `discoverArguments()` with 2 optional properties to customise the behaviour.

- **label?** \[string\]: a label to prefix the console.log entries with
- **returnValue?** \[any\]: a value that you want the function to return instead of the default (first element received by the function)

Example:
```ts
"helloWorld".replace(/[eo]/g, discoverArguments({
    label: "helloWorld replace",
    returnValue: "X"
}))

// result of .replace() function is "hXllXWXrld"

// console.log for each match in the RegEx:
```json
helloWorld replace callback received:  {
  "numberOfArgs": 3,
  "arguments": [
    "h: string",
    "0: number",
    "helloWorld: string"
  ]
}
```

### Validators
Zod validator helpers coming soon

## Getting started
1. Install the package in your project `npm install -D @benjymoses/helpers`
2. Import in to your code-base

Import whole package
```ts
import * as helpers from "@benjymoses/helpers"

helpers.capital("hello")
```

Import specific modules
```ts
import { capital } from "@benjymoses/helpers";

capital("hello")
```

## Contributing
Open to contribution. If you have ideas for useful helpers you'd like to see here, feel free to submit a PR, or open a feature request issue.

<!-- // TODO: links to PR and feature-request issue -->

### Guidance
This project uses [Projen](https://projen.io/) to scaffold and provide automation. Please familiarise yourself with the docs before contributing as there are some common "gotchas".

#### Development
You should have TypeScript and ts-node installed globally `npm install -g typescript ts-node` and then:

1. Fork the repo
2. Clone your fork
3. Run `npx projen` - this will cause Projen to use the *.projenrc.ts* to ensure all scaffolding is in place, and that npm packages are installed. You're welcome to then run `npm install` to be satisfied that all packages are installed.
4. Create a new branch `git checkout -b my-new-feature`

Develop your features / fixes. Please update the relevant \#\# Helpers section in *README.md* if this is a new feature / helper.

#### Testing
Tests of core functinoality are required, and testing edge cases is preferable. Take a look at existing tests for inspiration.

Tests live alongside the code. For example if you're writing a new string function `alternatingCase()` the code would reside in *src/string/alternatingCase.ts* and the tests would live in *src/string/\_\_tests\_\_/alternatingCase.test.ts*.

Your tests should be wrapped in a function, for example:

```ts
// alternatingCase.test.ts

export function alternatingCaseTests() {
  describe("alternatingCase", () => {
    it("should do a thing", () => {
      // your test code here
    })
  })
}
```

and then added to the test suite at *src/string/\_\_tests\_\_/string-suite.test.ts*, for example:

```ts
import { camelToKebabTests } from "./camelToKebab.test";
import { capitalTests } from "./capital.test";
import { kebabToCamelTests } from "./kebabToCamel.test";
import { alternatingCaseTests } from "./alternatingCase.test"; // <-- import your tests here

describe("String helpers", () => {
  camelToKebabTests();
  capitalTests();
  kebabToCamelTests();
  alternatingCaseTests(); // <-- flag your tests for execution
});
```

you can now run your tests with `npx projen test` or `npx projen test:coverage`

#### Submission

1. Run `npx projen`
2. Ensure tests pass (see above)
3. Push back to your forked repo's feature branch using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), for example `git commit -m "feat(alternatingCase): added string utility for alternatingCase"`
4. Ensure the Github action for *build* succeeds
5. Open a PR and complete the template

<!-- // TODO: add link for new PR -->

## License
MIT [view](https://github.com/benjymoses/helpers?tab=MIT-1-ov-file#readme)