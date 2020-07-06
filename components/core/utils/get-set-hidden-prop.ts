/**
 * Define a interface to add many props in a object
 */
export interface TargetPropertyDescription {

  /**
   * Name of a prop
   */
  name: string;

  /**
   * Value of a prop
   */
  value: any;

  /**
   * If the prop can be replaced with another value
   */
  readOnly: boolean;
}

/**
 * Type for varius descriptions
 */
export type TargetPropertyDescriptions = TargetPropertyDescription[];

/**
 * Create a hidden property not numerable in a object
 *
 *
 * @export
 * @param {Partial<any>} target Target object
 * @param {string} propName Property name
 * @param {*} value Value thats a property will receive
 * @param {boolean} [readonly=false] Set the property as a readonly
 */
export function setHiddenProp(target: Partial<any>, propName: string, value: any, readonly: boolean = false): Partial<any> {
  Object.defineProperty(target, propName, {
    value,
    enumerable: false,
    ...(readonly ? {
      writable: false,
      configurable: false
    } : {})
  });
  return target;
}

/**
 * Get a hidden property not numerable in a object
 *
 *
 * @export
 * @param {Partial<any>} target Target object
 * @param {string} propName Property name
 * @returns {T} The finded value
 */
export function getHiddenProp<V = any>(target: Partial<any>, propName: string): V {
  return target[propName] as V;
}

/**
 * Set a many props in a same target
 * 
 * @param {Partial<any>} target Target object
 * @param {TargetPropertyDescriptions} props The props descriptors
 * 
 * @returns {Partial<any>} The curtargetrent target modified
 */
export function setHiddenProps(target: Partial<any>, props: TargetPropertyDescriptions): Partial<any> {
  for (let i = 0, l = props.length; i < l; i++) {
    setHiddenProp(target, props[i].name, props[i].value, props[i].readOnly);
  }
  return target;
}
