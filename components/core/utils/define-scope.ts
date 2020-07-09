export function defineScope(scope: any, fn: (...args: any[]) => any): (...args: any[]) => any {
  return fn.bind(scope);
}
