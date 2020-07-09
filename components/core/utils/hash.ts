/**
 * Generate a random small hash
 *
 * @export
 * @returns {string}
 */
export function hash(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}