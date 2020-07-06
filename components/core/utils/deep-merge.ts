/**
 * Merge in deep
 *
 * @template T Template that will return after merge
 * @constant
 * @param {Partial<any>} target Primary source
 * @param {Partial<any>} source Secondary source
 * @returns {T} Merged parameters
 */
const deepMerge = <T>(target: Partial<any>, source: Partial<any>): T => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return (target as unknown) as T;
};

export {
  deepMerge
};

