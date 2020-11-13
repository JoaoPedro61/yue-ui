import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu-divider`,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [`[class.yue-ui-menu-divider]`]: `true`
  },
  preserveWhitespaces: false,
  exportAs: `yueUiMenuDividerRef`,
})
export class YueUiMenuDividerComponent { }
