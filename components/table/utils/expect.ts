import { deepTypechecker as type } from '@joaopedro61/yue-ui/core/utils';



export const expect_param = (paramName: string, value: any) => {
  const _type = type(value);
  if (_type === `null` || _type === `undefined`) {
    throw new Error(`The property "${paramName}" requires a non null of undefined value.`);
  }
};

export const expect_parent = (parent: string, allowed: string[]): void => {
  if (parent === `internal`) return void 0;
  if (allowed.indexOf(parent) === -1) {
    throw new Error(`The parent "${parent}" is not in the list of allowed parents.`);
  }
};
