import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-navigation-menu-bottom`,
  template: `
    <ng-content></ng-content>
  `,
  exportAs: 'yueUiNavigationMenuBottomRef',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiNavigationMenuBottomComponent { }
