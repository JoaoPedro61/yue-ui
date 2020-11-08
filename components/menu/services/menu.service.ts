import { Injectable, InjectionToken } from '@angular/core';




@Injectable()
export class YueUiMenuService {

}

export const MenuServiceLocalToken = new InjectionToken<YueUiMenuService>('MenuServiceLocalToken');

export function YueUiMenuServiceFactory(serviceInsideDropDown: YueUiMenuService, serviceOutsideDropDown: YueUiMenuService): YueUiMenuService {
  return serviceInsideDropDown ? serviceInsideDropDown : serviceOutsideDropDown;
}
