import { Component, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'yue-ui-button-group',
  template: `
    <ng-content select="[yueUiButton]"></ng-content>
  `,
  styleUrls: [],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiButtonGroupComponent {
}
