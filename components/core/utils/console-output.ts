import { camelCaseToDash } from './camel-case-to-dash';



/**
 * Apply and check the styles passed to the logger
 *
 * @usageNotes
 * ```typescript
 * loggerWithStyles(console.log, "My simple message", { fontSize: '18px' });
 * ```
 *
 * @internal
 * @ignore
 *
 * @param {(...args: any[]) => void} fn Target function
 * @param {*} message Source to display
 * @param {*} styles Style of display message
 */
function loggerWithStyles(fn: (...args: any[]) => void, message: any, styles: any) {
  let rawStyle = '';
  for (const key in styles) {
    if (styles.hasOwnProperty(key)) {
      rawStyle += `${camelCaseToDash(key)}: ${styles[key]};`;
    }
  }
  let raw = message;
  if ('string' === typeof raw) {
    raw = `%c${raw}`;
  }
  fn.call(console, raw, rawStyle);
}

export function consoleLog(message: any, styles: Partial<any> = {}): void {
  loggerWithStyles(console.log, message, styles);
}

export function consoleInfo(message: any, styles: Partial<any> = {}): void {
  loggerWithStyles(console.log, message, { color: '#03A9F4', ...styles });
}

export function consoleError(message: any, styles: Partial<any> = {}): void {
  loggerWithStyles(console.log, message, { color: '#f44336', ...styles });
}

export function consoleWarning(message: any, styles: Partial<any> = {}): void {
  loggerWithStyles(console.log, message, { color: '#ff9800', ...styles });
}
