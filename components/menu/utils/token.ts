import { InjectionToken } from '@angular/core';



export const IsMenuInsideDropDownToken = new InjectionToken<boolean>('IsMenuInsideDropDownToken');

export function MenuDropDownTokenFactory(isMenuInsideDropDownToken: boolean): boolean {
  return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}
