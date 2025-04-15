/**
 * Function returns the provided kebab-case string in camel-case format..
 *
 * @param {string} [str] - The string you want to re-case.
 *
 * @returns {string} Camel-case version of your provided kebab-case string.
 *
 * @example
 * ```ts
 * kebabToCamel("hello-world") // returns "helloWorld"
 * ```
 *
 */
export const kebabToCamel = (str: string): string =>
  str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[^a-zA-Z0-9]+/, "");
