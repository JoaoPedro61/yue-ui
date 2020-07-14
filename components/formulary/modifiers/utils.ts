import { deepTypechecker as type, DeepTypeCheckerTypes as Types } from './../../commons/deep-type-checker';



export const ALLOWED_TYPES = [
  'writable',
  'enumerable',
  'selectable',
  'checkable',
  'touchable',
  'internal',
];

export /**
 *
 *
 * @param {string} paramName
 * @param {*} value
 */
const expect_param = (paramName: string, value: any) => {
  const _type = type(value);
  if (_type === `null` || _type === `undefined`) {
    throw new Error(`The property "${paramName}" requires a non null of undefined value.`);
  }
};

export /**
 *
 *
 * @param {string} paramName
 * @param {*} value
 * @param {Types[]} expect
 */
const expect_type = (paramName: string, value: any, expect: Types[]) => {
  const _type = type(value);
  if (expect.indexOf(_type) === -1) {
    throw new Error(`The property "${paramName}" aren't of the type required, ALLOWED_TYPES: ${JSON.stringify(expect)}.`);
  }
};

export /**
 *
 *
 * @param {string} type
 */
const expect_allowed_field_type = (type: string) => {
  if (ALLOWED_TYPES.indexOf(type) === -1) {
    throw new Error(`The type "${type}" is no a allowed the, ALLOWES_TYPES: ${JSON.stringify(ALLOWED_TYPES)}`);
  }
};

export /**
 *
 *
 * @param {string} parent
 * @param {string[]} allowed
 * @returns
 */
const expect_parent = (parent: string, allowed: string[])  => {
  if (parent === `internal`) return void 0;
  if (allowed.indexOf(parent) === -1) {
    throw new Error(`The parent "${parent}" is not in the list of allowed parents.`);
  }
};

export /**
 *
 *
 * @param {*} scope
 * @param {((...args: any[]) => any)[]} handlers
 * @param {any[]} [args=[]]
 */
const relative_exec = (scope: any, handlers: ((...args: any[]) => any)[], args: any[] = []): void => {
  if (handlers.length) {
    function r() {
      new Promise((accept, reject) => {
        const _HANDLER = handlers.shift();
        if (_HANDLER) {
          if (typeof _HANDLER === `function`) {
            const retum = (_HANDLER.bind(scope)).apply(scope, [scope, ...args]);
            if (retum === void 0 || retum === null || retum === undefined || retum === true) {
              accept();
            } else {
              if (retum instanceof Promise) {
                retum.then(() => accept()).catch(() => reject());
              } else {
                reject();
              }
            }
          } else {
            reject();
          }
        } else {
          reject();
        }
      }).then(() => {
        r();
      });
    }
    r();
  }
};
