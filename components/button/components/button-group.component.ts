import { Component, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: 'yue-ui-button-group',
  template: `
    <ng-content selector="[yueUiButton]"></ng-content>
  `,
  styleUrls: [],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiButtonGroupComponent {
}
