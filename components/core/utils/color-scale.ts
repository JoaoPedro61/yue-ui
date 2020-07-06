/**
 * Generate one color in hexdecimal base
 *
 * @export
 * @param {number} [percentage=0] Number between 0 and 100
 * @returns {string}
 */
export function colorScale(percentage: number = 0): string {
  const b = 0;
  let r = 0;
  let g = 0;
  if (percentage < 50) {
    r = 255;
    g = Math.round(5.1 * percentage);
  } else {
    g = 255;
    r = Math.round(510 - 5.10 * percentage);
  }
  return '#' + ('000000' + (r * 0x10000 + g * 0x100 + b * 0x1).toString(16)).slice(-6);
}
