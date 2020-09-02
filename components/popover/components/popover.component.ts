import { Component, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef, Input } from '@angular/core';

import { YueUiSmartRenderType } from '@JoaoPedro61/yue-ui/smart-render';
import { deepTypechecker } from '@JoaoPedro61/yue-ui/core/utils';
import { BaseComponent } from '@JoaoPedro61/yue-ui/tooltip';



@Component({
  template: `
    <ng-template
      #overlay="cdkConnectedOverlayRef"
      cdkConnectedOverlay
      yueUiConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      [cdkConnectedOverlayPositions]="_positions"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="yue-ui-popover"
        [ngClass]="_classMap"
        [ngStyle]="overlayStyle"
      >
        <div class="yue-ui-popover-content">
          <div class="yue-ui-popover-arrow"></div>
          <div class="yue-ui-popover-inner">
            <div class="yue-ui-popover-title-wrapper" *ngIf="title">
              <yue-ui-smart-render [yueUiSmartRender]="title"></yue-ui-smart-render>
            </div>
            <div class="yue-ui-popover-content-wrapper" [ngStyle]="overlayContentStyle">
              <yue-ui-smart-render [yueUiSmartRender]="content"></yue-ui-smart-render>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: { '[class.yue-ui-popover--]': 'true' },
  exportAs: 'yueUiPopoverComponentRef'
})
export class YueUiPopoverComponent extends BaseComponent {

  @Input()
  public title: YueUiSmartRenderType = null;

  @Input()
  public content: YueUiSmartRenderType = null;

  _prefix = 'yue-ui-popover-placement';

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  protected isEmpty(): boolean {
    // @ts-ignore
    return this.title instanceof TemplateRef || this.content instanceof TemplateRef
      ? false
      : this.title === '' && this.content === ''
        ? true
        : (
            deepTypechecker(this.title) === 'null'
            || deepTypechecker(this.title) === 'undefined'
          )
          && (
            deepTypechecker(this.content) === 'null'
            || deepTypechecker(this.content) === 'undefined'
          );
  }

}
