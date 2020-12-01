import { Component, Input, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { YueUiModalRef } from '../utils/modal-ref';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-modal-footer`,
  template: `
    <div
      class="yue-ui-modal-footer-inner"
      [style.padding]="padding"
    >
      <ng-container *ngIf="ref.getConfig().footer; else default">
        <yue-ui-smart-render [yueUiSmartRender]="ref.getConfig().footer" [yueUiSmartRenderContext]="{ $implicit: ref.getConfig().componentParams, ref: ref }"></yue-ui-smart-render>
      </ng-container>
      <ng-template #default>
        <div class="default--buttons">
          <button
            *ngIf="ref.getConfig().cancelButtonText != null"
            yueUiButton
            [attr.cdkFocusInitial]="ref.getConfig().autofocus === 'cancel' || null"
            [yueUiButtonType]="ref.getConfig().cancelButtonType"
            [yueUiButtonSize]="ref.getConfig().cancelButtonSize"
            [yueUiButtonLoading]="!!ref.getConfig().cancelButtonLoading"
            [disabled]="ref.getConfig().cancelButtonDisabled"
            (click)="onTriggerCancel()"
          >
            <yue-ui-smart-render [yueUiSmartRender]="ref.getConfig().cancelButtonText" [yueUiSmartRenderContext]="{ $implicit: ref.getConfig().componentParams, ref: ref }"></yue-ui-smart-render>
          </button>
          <button
            *ngIf="ref.getConfig().okButtonText != null"
            yueUiButton
            [attr.cdkFocusInitial]="ref.getConfig().autofocus === 'ok' || null"
            [yueUiButtonType]="ref.getConfig().okButtonType"
            [yueUiButtonSize]="ref.getConfig().okButtonSize"
            [yueUiButtonLoading]="!!ref.getConfig().okButtonLoading"
            [disabled]="ref.getConfig().okButtonDisabled"
            (click)="onTriggerOk()"
          >
            <yue-ui-smart-render [yueUiSmartRender]="ref.getConfig().okButtonText" [yueUiSmartRenderContext]="{ $implicit: ref.getConfig().componentParams, ref: ref }"></yue-ui-smart-render>
          </button>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    '[class.yue-ui-modal-footer]': `true`,
  },
  exportAs: `yueUiModalFooterRef`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YueUiModalFooterComponent implements AfterViewInit, OnChanges {

  public get padding(): string {
    const config = this.ref.getConfig();

    if (config.padding && config.padding.footer) {
      return typeof config.padding.footer === `number` ? `${config.padding.footer}px` : config.padding.footer;
    }
    return `10px`;
  }

  @Output()
  public readonly onOk: EventEmitter<any> = new EventEmitter();

  @Output()
  public readonly onCancel: EventEmitter<any> = new EventEmitter();

  @Input(`ref`)
  public ref!: YueUiModalRef<any>;

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public onTriggerOk(): void {
    const config = this.ref.getConfig();
    if (!config.okButtonLoading || !config.okButtonDisabled) {
      this.onOk.emit();
    }
  }

  public onTriggerCancel(): void {
    const config = this.ref.getConfig();
    if (!config.cancelButtonLoading || !config.cancelButtonDisabled) {
      this.onCancel.emit();
    }
  }

  public ngAfterViewInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    const { ref } = changes;
    if (ref) {
      if (ref.isFirstChange()) {
        this.cdr.markForCheck();
      }
    }
  }

}
