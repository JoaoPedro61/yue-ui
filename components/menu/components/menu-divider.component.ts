import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu-divider`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [`[class.yue-ui-menu-divider]`]: `true`
  },
  preserveWhitespaces: false,
})
export class YueUiMenuDividerComponent {

}
