import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef, Optional, Inject } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';

import { Base } from './../utils/base';
import { YueUiModalOptions } from '../utils/options';
import { YueUiModalFooterComponent } from './footer.component';
import { YueUiModalHeaderComponent } from './header.component';


@Component({
  template: `
    <div
      #modalElement
      role="document"
      class="yue-ui-modal"
      [style.width]="width"
      [style.height]="height"
    >
      <div class="yue-ui-modal-content">
        <ng-container *ngIf="config.header">
          <yue-ui-modal-header #headerRef="yueUiModalHeaderRef"></yue-ui-modal-header>
        </ng-container>
        <div class="yue-ui-modal-body" [style.padding]="padding">
          <ng-template cdkPortalOutlet></ng-template>
          <ng-container *ngIf="isStringOrObservableContent">
            <div [innerHTML]="isAObservable ? (ngSafeValue_content | async) : config.content"></div>
          </ng-container>
        </div>
        <ng-container *ngIf="!footerIsEmpty">
          <yue-ui-modal-footer #footerRef="yueUiModalFooterRef" [ref]="modalRef" (onOk)="triggerOk()" (onCancel)="triggerCancel();"></yue-ui-modal-footer>
        </ng-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    `./../styles/container.component.less`
  ],
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

  constructor(elementRef: ElementRef, focusTrapFactory: FocusTrapFactory, cdr: ChangeDetectorRef, overlayRef: OverlayRef, public config: YueUiModalOptions<any>, @Optional() @Inject(DOCUMENT) document: Document) {
    super(elementRef, focusTrapFactory, cdr, overlayRef, config, document );
  }

}
