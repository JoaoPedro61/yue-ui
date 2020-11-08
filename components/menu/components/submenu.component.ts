import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu-submenu`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [`[class.yue-ui-menu-submenu]`]: `true`
  },
  preserveWhitespaces: false,
})
export class YueUiMenuSubmenuComponent {

}
