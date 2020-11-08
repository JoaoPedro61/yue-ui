import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `a[yueUiMenuItemLink]`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [`[class.yue-ui-menu-item-link]`]: `true`
  },
  preserveWhitespaces: false,
})
export class YueUiMenuItemLinkComponent {

}
