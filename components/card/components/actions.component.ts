import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-card-actions',
  template: `
    <div class="yue-ui-card-actions-wrapper">
      <ng-content select="yue-ui-card-action"></ng-content>
    </div>
  `,
  host: {
    '[class.yue-ui-card-actions]': `true`
  },
  preserveWhitespaces: false,
  exportAs: 'yueUiCardActionsRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCardActionsComponent { }
