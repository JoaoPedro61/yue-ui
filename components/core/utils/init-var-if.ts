import { deepTypeCheckerTypes, deepTypeChecker } from './deep-type-checker';

export function initVarIf(ifType: deepTypeCheckerTypes, v: any, assert: any): any {
  if (deepTypeChecker(v) === ifType) {
    return assert;
  }
  return v;
}

