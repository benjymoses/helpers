/**
 * Function returns the provided camel-case string in kebab-case format..
 *
 * @param {string} [str] - The string you want to re-case.
 *
 * @returns {string} Kebab-case version of your provided camel-case string.
 *
 * @example
 * ```ts
 * camelToKebab("helloWorld") // returns "hello-world"
 * ```
 *
 */
export const camelToKebab = (str: string): string =>
  str
    .replace(/[A-Z]/g, (match, offset) => (offset > 0 ? `-${match}` : match))
    .toLowerCase();
