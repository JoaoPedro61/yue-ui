import { deepTypechecker } from './deep-type-checker';


export interface SerializeStringJSONpath {
  [path: string]: any;
  first(): {
    value: any;
    path: string;
  } | void;
  last(): {
    value: any;
    path: string;
  } | void;
  keys(): string[];
  toArray(): [string, any][];
}

export function serializeStringJsonPath(target: Partial<any>, onlyWithValues?: boolean, property?: string, value?: any): SerializeStringJSONpath {
  if (value && value.length) {
    onlyWithValues = true;
  }

  const paths: any = {};

  Object.defineProperties(paths, {
    first: {
      enumerable: false,
      writable: false,
      configurable: false,
      value(): {
        value: any;
        path: string;
      } | void {
        const keys: string[] = Object.keys(this);
        for (let index = 0, length = keys.length; index < length; index++) {
          if (keys[index] !== 'first' && keys[index] !== 'last' && keys[index] !== 'keys' && keys[index] !== 'toArray') {
            return {
              value: this[keys[index]],
              path: keys[index],
            };
          }
        }
      }
    },
    last: {
      enumerable: false,
      writable: false,
      configurable: false,
      value(): {
        value: any;
        path: string;
      } | void {
        const keys: string[] = Object.keys(this);
        for (let index = keys.length, length = 0; index > length; index--) {
          if (keys[index] !== 'first' && keys[index] !== 'last' && keys[index] !== 'keys' && keys[index] !== 'toArray') {
            return {
              value: this[keys[index]],
              path: keys[index],
            };
          }
        }
      }
    },
    keys: {
      enumerable: false,
      writable: false,
      configurable: false,
      value(): string[] {
        return (() => {
          const keys: string[] = Object.keys(this);
          const i0 = keys.indexOf('first');
          const i1 = keys.indexOf('last');
          const i2 = keys.indexOf('keys');
          const i3 = keys.indexOf('toArray');
          if (i0 !== -1) {
            keys.splice(i0, 1);
          }
          if (i1 !== -1) {
            keys.splice(i1, 1);
          }
          if (i2 !== -1) {
            keys.splice(i2, 1);
          }
          if (i3 !== -1) {
            keys.splice(i3, 1);
          }
          return keys;
        })();
      }
    },
    toArray: {
      enumerable: false,
      writable: false,
      configurable: false,
      value(): [string, any][] {
        const keys: string[] = Object.keys(this);
        const result: [string, any][] = [];
        for (let index = 0, length = keys.length; index < length; index++) {
          if (keys[index] !== 'first' && keys[index] !== 'last' && keys[index] !== 'keys' && keys[index] !== 'toArray') {
            result.push([
              keys[index],
              this[keys[index]]
            ]);
          }
        }
        return result;
      }
    },
  });

  function recursive(source: Partial<any>, oldPath: string = '', _lastType: string = '', lastKey: string | number = '', evaluted: string = '$NOT_VALUE'): void {
    if (deepTypechecker(source) === 'array' || deepTypechecker(source) === 'object') {
      if (Array.isArray(source)) {
        if (source.length) {
          for (let index = 0, length = source.length; index < length; index++) {
            recursive(source[index], `${oldPath}[${index}]`, 'array', index, source[index]);
          }
        }
      } else {
        const keys: string[] = Object.keys(source);
        if (keys.length) {
          for (let index = 0, length = keys.length; index < length; index++) {
            recursive(source[keys[index]], `${oldPath}${oldPath.length ? '.' : ''}${keys[index]}`, 'object', keys[index], source[keys[index]]);
          }
        }
      }
    } else {
      if (!!(onlyWithValues && evaluted && evaluted !== '$NOT_VALUE')) {
        if (property && property.length) {
          if (value && value.length) {
            if (property === lastKey && value === evaluted) {
              paths[oldPath] = evaluted;
            }
          } else {
            if (property === lastKey) {
              paths[oldPath] = evaluted;
            }
          }
        } else {
          if (value && value.length) {
            if (value === evaluted) {
              paths[oldPath] = evaluted;
            }
          } else {
            paths[oldPath] = evaluted;
          }
        }
      } else {
        if (property && property.length) {
          if (property === lastKey) {
            paths[oldPath] = evaluted;
          }
        } else {
          paths[oldPath] = evaluted;
        }
      }
    }
  }

  recursive(target);

  return paths as SerializeStringJSONpath;
}
