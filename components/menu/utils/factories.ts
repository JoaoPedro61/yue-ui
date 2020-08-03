import { YueUiMenuService } from './../services/menu.service';


export function YueUiMenuServiceFactory(serviceInsideDropDown: YueUiMenuService, serviceOutsideDropDown: YueUiMenuService): YueUiMenuService {
  return serviceInsideDropDown ? serviceInsideDropDown : serviceOutsideDropDown;
}

export function MenuDropDownTokenFactory(isMenuInsideDropDownToken: boolean): boolean {
  return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}
