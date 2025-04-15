/**
 * Use this function in the place of a callback function when you don't know what arguments are being passed to that callback function.
 *
 * Useful for discovering the arguments passed to callbacks in methods like
 *
 * String.replace(), Array.map(), event listeners, etc.
 *
 * @param {Object} [options?] - Optional configuration options
 * @param {string} [options.label?] - Custom label to identify the callback in console output
 * @param {any} [options.returnValue?] - Specific value to return from the callback. If undefined, returns the first argument
 *
 * @returns {Function} A callback function that logs its received arguments
 *
 * @example
 * Basic usage with `String.replace`
 *
 * ```ts
 * "camelCase".replace(/([a-z])([A-Z])/g, discoverArguments());
 * ```
 *
 * would log to console:
 * ```json
 * callback received:  {
 *  "numberOfArgs": 5,
 *  "arguments": [
 *    "lC: string",
 *    "l: string",
 *    "C: string",
 *    "4: number",
 *    "camelCase: string"
 *  ]
 * }
 * ```
 *
 * @example
 * With custom label and return value
 *
 * ```ts
 * "camelCase".replace(/([a-z])([A-Z])/g, discoverArguments({
 *   label: "Replace callback",
 *   returnValue: "_"
 * }));
 * ```
 *
 * @example
 * With event listeners
 *
 * ```ts
 * element.addEventListener('click', discoverArguments({ label: "Click handler" }));
 * ```
 */
export function discoverArguments(
  options: {
    label?: string;
    returnValue?: any;
  } = {},
) {
  return (...args: any[]) => {
    console.log(
      `${options.label || ""} callback received: `,
      JSON.stringify(
        {
          numberOfArgs: args.length,
          arguments: args.map((arg) => `${arg}: ${typeof arg}`),
        },
        null,
        2,
      ),
    );
    return options.returnValue !== undefined ? options.returnValue : args[0];
  };
}
