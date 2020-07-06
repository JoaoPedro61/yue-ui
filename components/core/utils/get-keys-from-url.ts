/**
 * Identify if in the location path has a property identificator
 *
 *
 * @export
 * @param {string} rustic
 * @param {string} source
 * @returns {Partial<any>} Keys detected in route path
 */
export function getKeysFromURL(rustic: string, source: string): Partial<any> {
  const us1 = rustic.replace(/\?.+/, ``).split(`/`);
  const us2 = source.replace(/\?.+/, ``).split(`/`);
  const result: {[x: string]: any} = {};
  for (let index = 0, length = us1.length; index < length; index++) {
    if (index in us2) {
      if (us1[index] !== us2[index]) {
        result[us1[index].replace(`:`, ``)] = us2[index];
      }
    }
  }
  return result;
}
