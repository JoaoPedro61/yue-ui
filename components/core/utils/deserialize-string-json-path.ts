export interface SerializeReturnValue {
  [x: string]: any;
  value: any;
  oldValue: any;
}

export function deserializeStringJsonPath(path: string | [string, any][], source: any, override?: any, onlyValues?: boolean): SerializeReturnValue | void {
  let value: any;
  let oldValue: any;


  function recursive(segment: string | undefined, target: any, expSplited: string[], overrideT?: any): void {
    let segmentBetweenQuotes = false;
    if ('string' === typeof segment) {
      if (segment !== '.' && segment !== '[' && segment !== ']' && segment !== '') {
        if (/'|"/g.test(segment)) {
          segmentBetweenQuotes = true;
          segment = segment.replace(/'|"/g, '');
        }
        if (!target.hasOwnProperty(segment)) {
          if (expSplited.length === 1) {
            if (overrideT !== void 0) {
              if (onlyValues) {
                oldValue = target[segment];
                if (overrideT !== null && overrideT !== undefined) {
                  target[segment] = overrideT;
                }
                value = overrideT;
              } else {
                oldValue = target[segment];
                target[segment] = overrideT;
                value = overrideT;
              }
            } else {
              value = target[segment];
            }
          } else {
            if (expSplited[0] === '.') {
              target[segment] = {};
              target = target[segment];
            } else {
              if (expSplited[0] === '[') {
                if (segmentBetweenQuotes && expSplited[1]) {
                  target[segment] = {};
                  target = target[segment];
                } else {
                  if (target[expSplited[1]] !== void 0 && expSplited.length === 2) {
                    value = target[expSplited[1]];
                  } else {
                    target[segment] = [];
                    if (expSplited.length >= 4) {
                      const idenfier = (expSplited[3].length ? expSplited[3] : expSplited[4].length ? expSplited[4] : '__not__eveluted__').toString();
                      if (idenfier !== '__not__eveluted__') {
                        const index: number = parseInt(expSplited[1], 10);
                        if (idenfier === '.') {
                          target[segment][index] = {};
                        } else if (idenfier === '[') {
                          target[segment][index] = [];
                        }
                      }
                    }
                    target = target[segment];
                  }
                }
              } else {
                if (expSplited.length === 0) {
                  if (overrideT !== void 0) {
                    if (onlyValues) {
                      oldValue = target[segment];
                      if (overrideT !== null && overrideT !== undefined) {
                        target[segment] = overrideT;
                      }
                      value = overrideT;
                    } else {
                      oldValue = target[segment];
                      target[segment] = overrideT;
                      value = overrideT;
                    }
                  } else {
                    value = target[segment];
                  }
                } else if (expSplited.length === 1) {
                  if (expSplited[0] === ']') {
                    if (overrideT !== void 0) {
                      if (onlyValues) {
                        oldValue = target[segment];
                        if (overrideT !== null && overrideT !== undefined) {
                          target[segment] = overrideT;
                        }
                        value = overrideT;
                      } else {
                        oldValue = target[segment];
                        target[segment] = overrideT;
                        value = overrideT;
                      }
                    } else {
                      value = target[segment];
                    }
                  }
                }
              }
            }
          }
        } else {
          if (expSplited.length === 0) {
            if (overrideT !== void 0) {
              if (onlyValues) {
                oldValue = target[segment];
                if (overrideT !== null && overrideT !== undefined) {
                  target[segment] = overrideT;
                }
                value = overrideT;
              } else {
                oldValue = target[segment];
                target[segment] = overrideT;
                value = overrideT;
              }
            } else {
              value = target[segment];
            }
          } else if (expSplited.length === 1) {
            if (expSplited[0] === ']') {
              if (overrideT !== void 0) {
                if (onlyValues) {
                  oldValue = target[segment];
                  if (overrideT !== null && overrideT !== undefined) {
                    target[segment] = overrideT;
                  }
                  value = overrideT;
                } else {
                  oldValue = target[segment];
                  target[segment] = overrideT;
                  value = overrideT;
                }
              } else {
                value = target[segment];
              }
            }
          } else {
            target = target[segment];
          }
        }
        if (expSplited.length > 0) {
          recursive(expSplited.shift(), target, expSplited, overrideT);
        }
      } else {
        if (expSplited.length > 0) {
          recursive(expSplited.shift(), target, expSplited, overrideT);
        }
      }
    }
  }

  if (Array.isArray(path)) {
    for (let index = 0, length = path.length; index < length; index++) {
      if (Array.isArray(path[index])) {
        const pair = path[index];
        ((currentPairValues) => {
          const expSplited: string[] = currentPairValues[0].split(/(\.|\[|\])/);
          if (expSplited[expSplited.length - 1] === '') {
            expSplited.pop();
          }
          recursive(expSplited.shift(), source, expSplited, currentPairValues[1]);
        })(pair);
        return {
          value,
          oldValue,
          source
        } as any;
      } else {
        throw new Error(`Sorry, but object formation is wrong...`);
      }
    }
  } else {
    const expSplited: string[] = path.split(/(\.|\[|\])/);
    if (expSplited[expSplited.length - 1] === '') {
      expSplited.pop();
    }
    recursive(expSplited.shift(), source, expSplited, override);
    return {
      value,
      oldValue,
      source
    } as any;
  }

}
