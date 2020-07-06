/**
 * Avaliable returns types
 *
 * @export
 * @type {DeepTypeCheckerTypes}
 */
export type DeepTypeCheckerTypes = 'object' | 'date' | 'array' | 'string' | 'boolean' | 'function' | 'number' | 'undefined' | 'null' | 'unrecognized';

/**
 * Verification of type in deep
 *
 * @export
 * @param {*} value Parameter to check it type
 * @returns {DeepTypeCheckerTypes}
 */
export function deepTypechecker(value: any): DeepTypeCheckerTypes {
  const type: string = Object.prototype.toString.call(value);
  if (type === `[object Object]`) {
    return `object`;
  } else if (type === `[object Date]`) {
    return `date`;
  } else if (type === `[object Array]`) {
    return `array`;
  } else if (type === `[object String]`) {
    return `string`;
  } else if (type === `[object Boolean]`) {
    return `boolean`;
  } else if (type === `[object Function]`) {
    return `function`;
  } else if (type === `[object Number]`) {
    return `number`;
  } else if (type === `[object Undefined]`) {
    return `undefined`;
  } else if (type === `[object Null]`) {
    return `null`;
  } else {
    return 'unrecognized';
  }
}
