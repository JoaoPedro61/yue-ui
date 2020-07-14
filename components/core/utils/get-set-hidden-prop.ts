export interface TargetPropertyDescription {
  name: string;
  value: any;
  readOnly: boolean;
}


export type TargetPropertyDescriptions = TargetPropertyDescription[];

export function setHiddenProp(target: Partial<any>, propName: string, value: any, readonly: boolean = false): Partial<any> {
  Object.defineProperty(target, propName, {
    value,
    enumerable: false,
    ...(readonly ? {
      writable: false,
      configurable: false
    } : {
      writable: true,
      configurable: true
    })
  });
  return target;
}

export function getHiddenProp<V = any>(target: Partial<any>, propName: string): V {
  return target[propName] as V;
}

export function setHiddenProps(target: Partial<any>, props: TargetPropertyDescriptions): Partial<any> {
  for (let i = 0, l = props.length; i < l; i++) {
    setHiddenProp(target, props[i].name, props[i].value, props[i].readOnly);
  }
  return target;
}
