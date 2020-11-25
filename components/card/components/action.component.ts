import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-card-action',
  template: `
    <div class="yue-ui-card-action-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class.yue-ui-card-action]': `true`
  },
  preserveWhitespaces: false,
  exportAs: 'yueUiCardActionRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCardActionComponent { }
