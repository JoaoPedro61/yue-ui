import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-card-actions',
  template: `
    <div class="yue-ui-card-actions-wrapper">
    </div>
  `,
  host: {
    '[class.yue-ui-card-actions]': `true`
  },
  preserveWhitespaces: false,
  exportAs: 'yueUiCardActionsRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiCardActionsComponent {

  @Input()
  public actions!: YueUiSmartRenderType;

}
