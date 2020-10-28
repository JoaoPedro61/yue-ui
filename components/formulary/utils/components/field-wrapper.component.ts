import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';



@Component({
  selector: 'yue-ui-formulary-field-wrapper',
  template: `
    <div class="yue-ui-formulary-field-wrapper-inner --input-styled-as">
      <ng-container *ngIf="showPrepend">
        <div class="yue-ui-formulary-field-wrapper-inner-prepend">
          <yue-ui-smart-render [yueUiSmartRender]="prepend" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
        </div>
      </ng-container>
      <div class="yue-ui-formulary-field-wrapper-inner-styled">
        <ng-content></ng-content>
      </div>
      <ng-container *ngIf="showAppend">
        <div class="yue-ui-formulary-field-wrapper-inner-append">
          <ng-container *ngIf="allowClear && !disabled && !isEmpty">
            <yue-ui-formulary-clear
              [yueUiFormularyClearDisabled]="disabled"
              [yueUiFormularyClearIsEmpty]="isEmpty"
              (yueUiFormularyClearOn)="onClear.emit();"
            ></yue-ui-formulary-clear>
          </ng-container>
          <ng-container *ngIf="append">
            <yue-ui-smart-render [yueUiSmartRender]="append" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
          </ng-container>
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-formulary-field-wrapper]': `true`,
    '[class.yue-ui-formulary-field-wrapper-disabled]': `disabled`,
    '[class.yue-ui-formulary-field-wrapper-focused]': `focused`,
    '[class.yue-ui-formulary-field-wrapper-invalid]': `invalid`,
  },
  providers: [],
  exportAs: `yueUiFormularyFieldWrapperRef`
})
export class YueUiFormularyFieldWrapperComponent implements OnInit, AfterViewInit {

  @Input('yueUiFormularyFieldWrapperShowClearHandler')
  public allowClear = true;

  @Input('yueUiFormularyFieldWrapperPrepend')
  public prepend!: YueUiSmartRenderType;

  @Input('yueUiFormularyFieldWrapperAppend')
  public append!: YueUiSmartRenderType;

  @Input('yueUiFormularyFieldWrapperRenderContext')
  public context: Partial<any> = {};

  @Input('yueUiFormularyFieldWrapperDisabled')
  public disabled = false;

  @Input('yueUiFormularyFieldWrapperFocused')
  public focused = false;

  @Input('yueUiFormularyFieldWrapperInvalid')
  public invalid = false;

  @Input('yueUiFormularyFieldWrapperIsEmpty')
  public isEmpty = false;

  @Output('yueUiFormularyFieldWrapperOnClear')
  public onClear: EventEmitter<void> = new EventEmitter();

  public get showPrepend(): boolean {
    return !!this.prepend;
  }

  public get showAppend(): boolean {
    return (!!this.append || this.allowClear)
      ? !!this.append
        ? true
        : this.allowClear && !this.disabled
      : false;
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void { }

}
