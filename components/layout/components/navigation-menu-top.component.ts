import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-navigation-menu-top`,
  template: `
    <ng-content></ng-content>
  `,
  exportAs: 'yueUiNavigationMenuTopRef',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiNavigationMenuTopComponent { }
