import { Component, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: `yue-ui-navigation-menu-sider`,
  template: `
    <ng-content></ng-content>
  `,
  exportAs: 'navMenuSiderRef',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiNavigationMenuSiderComponent {



}
