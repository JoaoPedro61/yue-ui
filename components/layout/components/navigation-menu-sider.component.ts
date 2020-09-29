import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-navigation-menu-sider`,
  template: `
    <ng-content></ng-content>
  `,
  exportAs: 'yueUiNavigationMenuSiderRef',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiNavigationMenuSiderComponent { }
