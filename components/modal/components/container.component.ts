import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef, Optional, Inject, ViewEncapsulation } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';

import { Base } from './../utils/base';
import { YueUiModalOptions } from '../utils/options';
import { YueUiModalFooterComponent } from './footer.component';
import { YueUiModalHeaderComponent } from './header.component';



@Component({
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      #modalElement
      role="document"
      class="yue-ui-modal"
    >
      <div class="yue-ui-modal-content">
        <ng-container *ngIf="config.header">
          <yue-ui-modal-header #headerRef="yueUiModalHeaderRef"></yue-ui-modal-header>
        </ng-container>
        <div class="yue-ui-modal-body" [style.padding]="modalRef.padding">
          <ng-template cdkPortalOutlet></ng-template>
          <ng-container *ngIf="isStringOrObservableContent">
            <yue-ui-smart-render [yueUiSmartRender]="config.content" [yueUiSmartRenderContext]="{ $implicit: config.componentParams, ref: modalRef }"></yue-ui-smart-render>
          </ng-container>
        </div>
        <ng-container *ngIf="!modalRef.footerIsEmpty">
          <yue-ui-modal-footer #footerRef="yueUiModalFooterRef" [ref]="modalRef" (onOk)="triggerOk()" (onCancel)="triggerCancel();"></yue-ui-modal-footer>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.yue-ui-modal-container]': `true`,
  },
  exportAs: `yueUiModalContainerRef`
})
export class YueUiContainerComponent extends Base {

  @ViewChild(CdkPortalOutlet, { static: true })
  public portalOutlet!: CdkPortalOutlet;

  @ViewChild('headerRef', { static: false })
  public modalHeaderRef!: YueUiModalHeaderComponent;

  @ViewChild('modalElement', { static: true })
  public modalElementRef!: ElementRef<HTMLDivElement>;

  @ViewChild('footerRef', { static: false })
  public modalFooterRef!: YueUiModalFooterComponent;

  constructor(elementRef: ElementRef, focusTrapFactory: ConfigurableFocusTrapFactory, cdr: ChangeDetectorRef, overlayRef: OverlayRef, public config: YueUiModalOptions<any>, @Optional() @Inject(DOCUMENT) document: any) {
    super(elementRef, focusTrapFactory, cdr, overlayRef, config, document);
  }

}
