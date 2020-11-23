import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-card-content',
  template: `
    <div class="yue-ui-card-content-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class.yue-ui-card-content]': `true`
  },
  preserveWhitespaces: false,
  exportAs: 'yueUiCardContentRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCardContentComponent {

}
