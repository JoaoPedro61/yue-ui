/**
 * Define scope
 * 
 * @param {*} scope Scope that will be inject
 * @param {(...args: any[]) => any} fn Target of injection
 * 
 * @returns {(...args: any[]) => any} Function with a defined scope
 */
export function defineScope(scope: any, fn: (...args: any[]) => any): (...args: any[]) => any {
  return fn.bind(scope);
}
