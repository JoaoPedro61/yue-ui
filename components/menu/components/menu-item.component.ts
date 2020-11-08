import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu-item`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [`[class.yue-ui-menu-item]`]: `true`
  },
  preserveWhitespaces: false,
})
export class YueUiMenuItemComponent {

}
