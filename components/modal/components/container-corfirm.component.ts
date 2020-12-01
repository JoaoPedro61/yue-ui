import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef, Optional, Inject, ViewEncapsulation } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';

import { Base } from './../utils/base';
import { YueUiModalOptions } from '../utils/options';



@Component({
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      #modalElement
      role="document"
      class="yue-ui-modal"
    >
      <div class="yue-ui-modal-content" [style.borderColor]="borderColor">
        <div class="yue-ui-modal-header" [style.padding]="modalRef.paddingHeader">
          <yue-ui-smart-render [yueUiSmartRender]="config.header" [yueUiSmartRenderContext]="{ $implicit: config.componentParams, ref: modalRef }"></yue-ui-smart-render>
        </div>
        <div class="yue-ui-modal-body" [style.padding]="modalRef.padding">
          <ng-template cdkPortalOutlet></ng-template>
          <ng-container *ngIf="isStringOrObservableContent">
            <yue-ui-smart-render [yueUiSmartRender]="config.content" [yueUiSmartRenderContext]="{ $implicit: config.componentParams, ref: modalRef }"></yue-ui-smart-render>
          </ng-container>
        </div>
        <div class="yue-ui-modal-footer" [style.padding]="modalRef.paddingFooter">
          <div class="default--buttons">
            <button
              *ngIf="config.cancelButtonText !== null"
              yueUiButton
              [attr.cdkFocusInitial]="config.autofocus === 'cancel' || null"
              [yueUiButtonType]="config.cancelButtonType"
              [yueUiButtonSize]="config.cancelButtonSize"
              [yueUiButtonLoading]="!!config.cancelButtonLoading"
              [disabled]="config.cancelButtonDisabled"
              (click)="triggerCancel()"
            >
              <yue-ui-smart-render [yueUiSmartRender]="config.cancelButtonText" [yueUiSmartRenderContext]="{ $implicit: config.componentParams, ref: modalRef }"></yue-ui-smart-render>
            </button>
            <button
              *ngIf="config.okButtonText !== null"
              yueUiButton
              [attr.cdkFocusInitial]="config.autofocus === 'ok' || null"
              [yueUiButtonType]="config.okButtonType"
              [yueUiButtonSize]="config.okButtonSize"
              [yueUiButtonLoading]="!!config.okButtonLoading"
              [disabled]="config.okButtonDisabled"
              (click)="triggerOk()"
            >
              <yue-ui-smart-render [yueUiSmartRender]="config.okButtonText" [yueUiSmartRenderContext]="{ $implicit: config.componentParams, ref: modalRef }"></yue-ui-smart-render>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.yue-ui-modal-container-confirm]': `true`,
  },
  exportAs: `yueUiModalContainerConfirmRef`
})
export class YueUiContainerComfirmComponent extends Base {

  private readonly colors: { [x: string]: any } = {
    confirm: `var(--primary)`,
    info: `var(--info)`,
    success: `var(--success)`,
    error: `var(--error)`,
    warning: `var(--warning)`
  };

  @ViewChild(CdkPortalOutlet, { static: true })
  public portalOutlet!: CdkPortalOutlet;

  @ViewChild('modalElement', { static: true })
  public modalElementRef!: ElementRef<HTMLDivElement>;

  public get borderColor(): string {
    return this.config && this.config.confirmType
      ? this.colors[this.config.confirmType] || `var(--primary)`
      : `var(--primary)`
  }

  constructor(elementRef: ElementRef, focusTrapFactory: ConfigurableFocusTrapFactory, cdr: ChangeDetectorRef, overlayRef: OverlayRef, public config: YueUiModalOptions<any>, @Optional() @Inject(DOCUMENT) document: any) {
    super(elementRef, focusTrapFactory, cdr, overlayRef, config, document);
  }

}
