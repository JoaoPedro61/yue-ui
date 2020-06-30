import { Component, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: `yue-ui-navigation-menu-top`,
  template: `
    <ng-content></ng-content>
  `,
  exportAs: 'navMenuTopRef',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiNavigationMenuTopComponent {



}
