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
