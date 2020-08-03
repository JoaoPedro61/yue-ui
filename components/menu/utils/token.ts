import { InjectionToken } from '@angular/core';
import { YueUiMenuService } from './../services/menu.service';

export const IsMenuInsideDropDownToken = new InjectionToken<boolean>('IsMenuInsideDropDownToken');
export const MenuServiceLocalToken = new InjectionToken<YueUiMenuService>('MenuServiceLocalToken');
