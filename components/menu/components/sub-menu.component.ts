import { Component, ChangeDetectionStrategy } from "@angular/core";



@Component({
  selector: 'li[yueUiSubMenu]',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-sub-menu]': 'true'
  },
})
export class YueUiSubMenuComponent { }
