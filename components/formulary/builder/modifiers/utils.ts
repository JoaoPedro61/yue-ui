import { deepTypeChecker as type, deepTypeCheckerTypes as Types } from '@joaopedro61/yue-ui/core/utils';



export const ALLOWED_TYPES = [
  'writable',
  'enumerable',
  'selectable',
  'checkable',
  'touchable',
  'internal',
];

export const expect_param = (paramName: string, value: any) => {
  const _type = type(value);
  if (_type === `null` || _type === `undefined`) {
    throw new Error(`The property "${paramName}" requires a non null of undefined value.`);
  }
};

export const expect_type = (paramName: string, value: any, expect: Types[]) => {
  const _type = type(value);
  if (expect.indexOf(_type) === -1) {
    throw new Error(`The property "${paramName}" aren't of the type required, ALLOWED_TYPES: ${JSON.stringify(expect)}.`);
  }
};

export const expect_allowed_field_type = (type: string) => {
  if (ALLOWED_TYPES.indexOf(type) === -1) {
    throw new Error(`The type "${type}" is no a allowed the, ALLOWES_TYPES: ${JSON.stringify(ALLOWED_TYPES)}`);
  }
};

export const expect_parent = (parent: string, allowed: string[]): void => {
  if (parent === `internal`) return void 0;
  if (allowed.indexOf(parent) === -1) {
    throw new Error(`The parent "${parent}" is not in the list of allowed parents.`);
  }
};

export const relative_exec = (scope: any, handlers: ((...args: any[]) => any)[], args: any[] = []): void => {
  if (handlers.length) {
    for (const h of handlers) {
      (h.bind(scope)).apply(scope, [...args]);
    }
    return void 0;
  }
};
