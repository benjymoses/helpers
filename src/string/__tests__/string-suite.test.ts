import { kebabToCamelTests } from "./kebabToCamel.test";
import { capitalTests } from "./capital.test";
import { camelToKebabTests } from "./camelToKebab.test";

describe("String helpers", () => {
  kebabToCamelTests();
  capitalTests();
  camelToKebabTests();
});
