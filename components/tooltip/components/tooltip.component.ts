import { Component, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef, Input } from '@angular/core';

import { deepTypechecker } from '@JoaoPedro61/yue-ui/core/utils';

import { BaseComponent } from './../utils/base';



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
        class="yue-ui-tooltip"
        [ngClass]="_classMap"
        [ngStyle]="overlayStyle"
      >
        <div class="yue-ui-tooltip-content">
          <div class="yue-ui-tooltip-arrow"></div>
          <div class="yue-ui-tooltip-inner">
            <yue-ui-smart-render yueUiSmartRender="title"></yue-ui-smart-render>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: { '[class.yue-ui-tooltip--]': 'true' },
  exportAs: 'yueUiTooltipComponentRef'
})
export class YueUiTooltipComponent extends BaseComponent {

  @Input()
  public title: string | TemplateRef<any> | null = null;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  protected isEmpty(): boolean {
    // @ts-ignore
    return this.title instanceof TemplateRef
      ? false
      : this.title === ''
        ? true
        : deepTypechecker(this.title) === 'null' || deepTypechecker(this.title) === 'undefined';
  }

}
