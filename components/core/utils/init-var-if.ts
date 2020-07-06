import { DeepTypeCheckerTypes, deepTypechecker } from './deep-type-checker';

export function initVarIf(ifType: DeepTypeCheckerTypes, v: any, assert: any): any {
  if (deepTypechecker(v) === ifType) {
    return assert;
  }
  return v;
}

