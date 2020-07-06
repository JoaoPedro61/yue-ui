import { Component, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: `yue-ui-navigation-menu-bottom`,
  template: `
    <ng-content></ng-content>
  `,
  exportAs: 'navMenuBottomRef',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiNavigationMenuBottomComponent { }
