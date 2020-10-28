import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-button-group',
  template: `
    <ng-content select="yue-ui-button, button[yueUiButton], a[yueUiButton]"></ng-content>
  `,
  styleUrls: [],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiButtonGroupComponent { }
