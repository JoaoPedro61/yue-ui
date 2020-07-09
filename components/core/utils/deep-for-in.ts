export function deepForIn(target: Array<any> | Partial<any>, fn: (value: any, key: string, source: Partial<any>) => void): void {
  if (Array.isArray(target)) {
    for (let i = 0, l = target.length; i < l; i++) {
      deepForIn(target[i], fn);
    }
  } else if (typeof target === `object`) {
    const keys = Object.keys(target);
    for (let i = 0, l = keys.length; i < l; i++) {
      const value: any = fn.call({ value: (target as any)[keys[i]], key: keys[i], source: target }, (target as any)[keys[i]], keys[i], target);
      if (`object` === typeof value) {
        target = { ...target, ...value };
      }
      if (Array.isArray((target as any)[keys[i]]) || `object` === typeof (target as any)[keys[i]]) {
        deepForIn((target as any)[keys[i]], fn);
      }
    }
  }
}
