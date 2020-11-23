import { Component, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef, Input, ViewEncapsulation, ViewChild } from '@angular/core';

import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';
import { deepTypeChecker } from '@joaopedro61/yue-ui/core/utils';
import { BaseComponent } from '@joaopedro61/yue-ui/tooltip';
import { YueUiMenuComponent } from '@joaopedro61/yue-ui/menu';



@Component({
  encapsulation: ViewEncapsulation.None,
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
        [class.yue-ui-popover-menu]="hasMenu"
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

  @ViewChild(YueUiMenuComponent, { static: false })
  public menu?: YueUiMenuComponent;

  public get hasMenu(): boolean {
    return !!this.menu;
  }

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
          deepTypeChecker(this.title) === 'null'
          || deepTypeChecker(this.title) === 'undefined'
        )
        && (
          deepTypeChecker(this.content) === 'null'
          || deepTypeChecker(this.content) === 'undefined'
        );
  }

}
