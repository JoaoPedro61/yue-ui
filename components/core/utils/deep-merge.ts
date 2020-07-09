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

