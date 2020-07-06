/**
 * Converts camelCase strings to dashCase
 *
 * @usageNotes
 * ```typescript
 * const converted = camelCaseToDash("ThisIsMyString");
 * // converted will be equals to:
 * // "this-is-my-string"
 * ```
 *
 * @export
 * @param {string} raw Input string
 * @returns {string} Converted string
 */
export function camelCaseToDash(raw: string): string {
  return raw.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}
