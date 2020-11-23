import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-card-footer',
  template: `
    <div class="yue-ui-card-footer-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class.yue-ui-card-footer]': `true`
  },
  preserveWhitespaces: false,
  exportAs: 'yueUiCardFooterRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCardFooterComponent {

}
