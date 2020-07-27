import { Component, ChangeDetectionStrategy } from "@angular/core";



@Component({
  selector: 'ul[yueUiMenu]',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-menu]': 'true'
  },
})
export class YueUiMenuComponent { }
