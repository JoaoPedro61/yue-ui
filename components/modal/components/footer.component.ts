import { Component, Input, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { YueUiModalRef } from '../utils/modal-ref';
import { YueUiModalOptions } from '../utils/options';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-modal-footer`,
  template: `
    <div
      class="yue-ui-modal-footer-inner"
      [style.padding]="padding">
      <ng-container *ngIf="config.footer; else default">
        <ng-container *yueUiStringTemplateRefRender="config.footer; context: { $implicit: config.componentParams, ref: ref }">
          <ng-container>
            <div [innerHTML]="isAObservable ? (ngSafeValue_footer | async) : config.footer"></div>
          </ng-container>
        </ng-container>
      </ng-container>
      <ng-template #default>
        <div class="default--buttons">
          <button
            *ngIf="config.cancelButtonText !== null"
            yueUiButton
            [attr.cdkFocusInitial]="config.autofocus === 'cancel' || null"
            [yueUiButtonType]="config.cancelButtonType"
            [yueUiButtonSize]="config.cancelButtonSize"
            [yueUiButtonLoading]="!!config.cancelButtonLoading"
            [disabled]="config.cancelButtonDisabled"
            (click)="onTriggerCancel()"
          >
            <ng-container *yueUiStringTemplateRefRender="config.cancelButtonText; context: { $implicit: config.componentParams, ref: ref }">
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
            (click)="onTriggerOk()"
          >
            <ng-container *yueUiStringTemplateRefRender="config.okButtonText; context: { $implicit: config.componentParams, ref: ref }">
              <div [innerHTML]="isAObservableOkButtonText ? (ngSafeValue_okButtonText | async) : config.okButtonText"></div>
            </ng-container>
          </button>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    '[class.yue-ui-modal-footer]': `true`,
  },
  styleUrls: [
    `./../styles/footer.component.less`,
  ],
  exportAs: `yueUiModalFooterRef`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YueUiModalFooterComponent implements AfterViewInit, OnChanges {

  public get padding(): string {
    if (this.config.padding && this.config.padding.footer) {
      return typeof this.config.padding.footer === `number` ? `${this.config.padding.footer}px` : this.config.padding.footer;
    }
    return `10px`;
  }

  public get isAObservableCancelButtonText(): boolean {
    return this.config.cancelButtonText instanceof Observable;
  }

  public get isAObservableOkButtonText(): boolean {
    return this.config.okButtonText instanceof Observable;
  }

  public get isAObservable(): boolean {
    return this.config.footer instanceof Observable;
  }

  public get ngSafeValue_footer(): any {
    return this.config.footer;
  }

  public get ngSafeValue_okButtonText(): any {
    return this.config.okButtonText;
  }

  public get ngSafeValue_cancelButtonText(): any {
    return this.config.cancelButtonText;
  }

  @Output()
  public readonly onOk: EventEmitter<any> = new EventEmitter();

  @Output()
  public readonly onCancel: EventEmitter<any> = new EventEmitter();

  @Input(`ref`)
  public ref!: YueUiModalRef<any>;

  constructor(public readonly config: YueUiModalOptions<any>, public readonly cdr: ChangeDetectorRef) { }

  public onTriggerOk(): void {
    if (!this.config.okButtonLoading || !this.config.okButtonDisabled) {
      this.onOk.emit();
    }
  }

  public onTriggerCancel(): void {
    if (!this.config.cancelButtonLoading || !this.config.cancelButtonDisabled) {
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
