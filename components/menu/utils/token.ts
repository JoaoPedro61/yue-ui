import { InjectionToken } from '@angular/core';

import { YueUiMenuService } from '../services/menu.service';


export const IsMenuInsideDropDownToken = new InjectionToken<boolean>('IsMenuInsideDropDownToken');

export function MenuDropDownTokenFactory(isMenuInsideDropDownToken: boolean): boolean {
  return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}


export const MenuServiceLocalToken = new InjectionToken<YueUiMenuService>('MenuServiceLocalToken');

export function YueUiMenuServiceFactory(serviceInsideDropDown: YueUiMenuService, serviceOutsideDropDown: YueUiMenuService): YueUiMenuService {
  return serviceInsideDropDown ? serviceInsideDropDown : serviceOutsideDropDown;
}
