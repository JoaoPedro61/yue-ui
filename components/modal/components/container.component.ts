import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, ChangeDetectorRef, Optional, Inject } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';

import { Base } from './../utils/base';
import { YueUiModalOptions } from '../utils/options';


@Component({
  template: `
    <div
      #modalElement
      role="document"
      class="ant-modal"
    >
      <div class="ant-modal-content">
        <div class="ant-modal-body">
          <ng-template cdkPortalOutlet></ng-template>
          <div *ngIf="isStringContent" [innerHTML]="config.content"></div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.yue-ui-modal-container]': `true`,
  },
})
export class YueUiContainerComponent extends Base {

  @ViewChild(CdkPortalOutlet, { static: true })
  public portalOutlet!: CdkPortalOutlet;

  @ViewChild('modalElement', { static: true })
  public modalElementRef!: ElementRef<HTMLDivElement>;

  constructor(
    elementRef: ElementRef,
    focusTrapFactory: FocusTrapFactory,
    cdr: ChangeDetectorRef,
    overlayRef: OverlayRef,
    public config: YueUiModalOptions<any>,
    @Optional() @Inject(DOCUMENT) document: Document
  ) {
    super(elementRef, focusTrapFactory, cdr, overlayRef, config, document );
  }

}
