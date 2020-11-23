import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-card-cover',
  template: `
    <div class="yue-ui-card-cover-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class.yue-ui-card-cover]': `true`
  },
  preserveWhitespaces: false,
  exportAs: 'yueUiCardCoverRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCardCoverComponent {

}
