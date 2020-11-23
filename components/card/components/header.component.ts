import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-card-header',
  template: `
    <div class="yue-ui-card-header-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class.yue-ui-card-header]': `true`
  },
  preserveWhitespaces: false,
  exportAs: 'yueUiCardHeaderRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCardHeaderComponent {

}
