import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef, Optional, Inject } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';

import { Base } from './../utils/base';
import { YueUiModalOptions } from '../utils/options';


@Component({
  template: `
    <div
      #modalElement
      role="document"
      class="yue-ui-modal"
      [style.width]="width"
      [style.height]="height"
    >
      <div class="yue-ui-modal-content" [style.borderColor]="borderColor">
        <div class="yue-ui-modal-header" [style.padding]="paddingHeader">
          <ng-container *yueUiStringTemplateRefRender="config.header">
            <div [innerHTML]="headerIsAObservable ? (ngSafeValue_header | async) : config.header"></div>
          </ng-container>
        </div>
        <div class="yue-ui-modal-body" [style.padding]="padding">
          <ng-template cdkPortalOutlet></ng-template>
          <ng-container *ngIf="isStringOrObservableContent">
            <div [innerHTML]="isAObservable ? (ngSafeValue_content | async) : config.content"></div>
          </ng-container>
        </div>
        <div class="yue-ui-modal-footer" [style.padding]="paddingFooter">
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
              <ng-container *yueUiStringTemplateRefRender="config.cancelButtonText; context: { $implicit: config.componentParams, ref: modalRef }">
                <div [innerHTML]="isAObservableCancelButtonText ? (ngSafeValue_cancelButtonText | async) : config.cancelButtonText"></div>
              </ng-container>
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
              <ng-container *yueUiStringTemplateRefRender="config.okButtonText; context: { $implicit: config.componentParams, ref: modalRef }">
                <div [innerHTML]="isAObservableOkButtonText ? (ngSafeValue_okButtonText | async) : config.okButtonText"></div>
              </ng-container>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    `./../styles/container-confirm.component.less`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.yue-ui-modal-container-confirm]': `true`,
  },
  exportAs: `yueUiModalContainerConfirmRef`
})
export class YueUiContainerComfirmComponent extends Base {

  private readonly colors: {[x: string]: any} = {
    confirm: `var(--color-secondary)`,
    info: `var(--color-info)`,
    success: `var(--color-success)`,
    error: `var(--color-error)`,
    warning: `var(--color-warning)`
  };

  @ViewChild(CdkPortalOutlet, { static: true })
  public portalOutlet!: CdkPortalOutlet;
  
  @ViewChild('modalElement', { static: true })
  public modalElementRef!: ElementRef<HTMLDivElement>;

  public get borderColor(): string {
    return this.config && this.config.confirmType 
      ? this.colors[this.config.confirmType] || `var(--color-secondary)`
      : `var(--color-secondary)`
  }

  constructor(elementRef: ElementRef, focusTrapFactory: ConfigurableFocusTrapFactory, cdr: ChangeDetectorRef, overlayRef: OverlayRef, public config: YueUiModalOptions<any>, @Optional() @Inject(DOCUMENT) document: any) {
    super(elementRef, focusTrapFactory, cdr, overlayRef, config, document );
  }

}
