import { Component, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef, Input } from '@angular/core';

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
              <ng-container *yueUiStringTemplateRefRender="title">{{ title }}</ng-container>
            </div>
            <div class="yue-ui-popover-content-wrapper">
              <ng-container *yueUiStringTemplateRefRender="content">{{ content }}</ng-container>
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
  public title: string | TemplateRef<any> | null = null;

  @Input()
  public content: string | TemplateRef<any> | null = null;

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
