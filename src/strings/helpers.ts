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
export const kebabToCamel = (str: string): string => {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[^a-zA-Z0-9]+/, "");
};

/**
 * Function returns the provided string with the first letter capitalised.
 *
 * @param {string} [str] - The string you want to capitalise the first letter of.
 *
 * @returns {string} Your original string with the first letter capitalised.
 *
 * @example
 * ```ts
 * capital("hello") // returns "Hello"
 * ```
 *
 */
export function capital(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
export const camelToKebab = (str: string): string => {
  return str
    .replace(/[A-Z]/g, (match, offset) => (offset > 0 ? `-${match}` : match))
    .toLowerCase();
};
