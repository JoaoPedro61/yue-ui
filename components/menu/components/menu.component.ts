import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, SkipSelf, ViewEncapsulation } from '@angular/core';

import {
  MenuServiceLocalToken,
  YueUiMenuService,
  YueUiMenuServiceFactory
} from './../services/menu.service';
import { IsMenuInsideDropDownToken, MenuDropDownTokenFactory } from './../utils/token';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu`,
  template: `<ng-content select="[yueUiMenuItemLink], yue-ui-menu-item, yue-ui-menu-submenu, yue-ui-menu-divider, yue-ui-menu-group"></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MenuServiceLocalToken,
      useClass: YueUiMenuService
    },
    {
      provide: YueUiMenuService,
      useFactory: YueUiMenuServiceFactory,
      deps: [[new SkipSelf(), new Optional(), YueUiMenuService], MenuServiceLocalToken]
    },
    {
      provide: IsMenuInsideDropDownToken,
      useFactory: MenuDropDownTokenFactory,
      deps: [[new SkipSelf(), new Optional(), IsMenuInsideDropDownToken]]
    }
  ],
  host: {
    [`[class.yue-ui-menu]`]: `true`
  },
  preserveWhitespaces: false,
})
export class YueUiMenuComponent {

  constructor(
    private readonly service: YueUiMenuService,
    @Inject(IsMenuInsideDropDownToken) public readonly isMenuInsideDropDown: boolean,
    private readonly cdr: ChangeDetectorRef
  ) {
    console.log(this);
  }

}
