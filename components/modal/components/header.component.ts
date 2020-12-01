import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { YueUiModalOptions } from '../utils/options';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-modal-header`,
  template: `
    <div class="yue-ui-modal-header-inner" [style.padding]="padding">
      <ng-container *yueUiStringTemplateRefRender="config.header">
        <yue-ui-smart-render [yueUiSmartRender]="config.header"></yue-ui-smart-render>
      </ng-container>
    </div>
  `,
  preserveWhitespaces: false,
  exportAs: `yueUiModalHeaderRef`,
  host: {
    '[class.yue-ui-modal-header]': `true`,
    '[class.yue-ui-modal-header-confirm]': `type === 'confirm'`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YueUiModalHeaderComponent {

  public get type(): string {
    if (this.config.type) {
      return this.config.type;
    }
    return 'default';
  }

  public get padding(): string {
    if (this.config.padding && this.config.padding.header) {
      return typeof this.config.padding.header === `number` ? `${this.config.padding.header}px` : this.config.padding.header;
    }
    return `10px`;
  }

  constructor(public readonly config: YueUiModalOptions<any>, public readonly cdr: ChangeDetectorRef) { }

}
