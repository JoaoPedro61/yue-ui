import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { YueUiModalOptions } from '../utils/options';
import { Observable } from 'rxjs';



@Component({
  selector: `yue-ui-modal-header`,
  template: `
    <div class="yue-ui-modal-header-inner" [style.padding]="padding">
      <ng-container *yueUiStringTemplateRefRender="config.header">
        <div [innerHTML]="isAObservable ? (ngSafeValue_header | async) : config.header"></div>
      </ng-container>
    </div>
  `,
  exportAs: `yueUiModalHeaderRef`,
  host: {
    '[class.yue-ui-modal-header]': `true`,
  },
  styleUrls: [
    `./../styles/header.component.less`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YueUiModalHeaderComponent {

  public get padding(): string {
    if (this.config.padding && this.config.padding.header) {
      return typeof this.config.padding.header === `number` ? `${this.config.padding.header}px` : this.config.padding.header;
    }
    return `10px`;
  }

  public get isAObservable(): boolean {
    return this.config.header instanceof Observable;
  }

  public get ngSafeValue_header(): any {
    return this.config.header;
  }

  constructor(public readonly config: YueUiModalOptions<any>, public readonly cdr: ChangeDetectorRef) { }

}
