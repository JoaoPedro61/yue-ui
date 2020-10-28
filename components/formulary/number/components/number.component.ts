import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, AfterViewInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { hash } from '@joaopedro61/yue-ui/core/utils';

import { FieldBase } from '@joaopedro61/yue-ui/formulary/utils';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-formulary-number',
  template: `
    <yue-ui-formulary-field-wrapper
      [yueUiFormularyFieldWrapperPrepend]="prepend"
      [yueUiFormularyFieldWrapperAppend]="append"
      [yueUiFormularyFieldWrapperDisabled]="disabled"
      [yueUiFormularyFieldWrapperRenderContext]="{value: value}"
      [yueUiFormularyFieldWrapperShowClearHandler]="allowClear"
      [yueUiFormularyFieldWrapperFocused]="focused"
      [yueUiFormularyFieldWrapperIsEmpty]="isEmpty"
      (yueUiFormularyFieldWrapperOnClear)="clear();"
    >
      <input
        type="number"
        [id]="id"
        [(ngModel)]="value"
        [placeholder]="placeholderIsAObservable ? ($any(placeholder) | async) : $any(placeholder)"
        [attr.cdkFocusInitial]="initialFocus"
        [ngModelOptions]="{ standalone: true }"
        [disabled]="disabled"
        (focus)="updateFocus(true); onFocus.emit($event);"
        (blur)="updateFocus(false); onBlur.emit($event);"
        (keydown)="onKeydown.emit($event);"
        (keyup)="onKeyup.emit($event);"
      >
    </yue-ui-formulary-field-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiFormularyNumberComponent),
      multi: true,
    }
  ],
  host: {
    '[class.yue-ui-formulary-number]': `true`,
    '[class.yue-ui-formulary-field]': `true`,
  }
})
export class YueUiFormularyNumberComponent extends FieldBase implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input('yueUiFormularyNumberPrepend')
  public prepend!: YueUiSmartRenderType;

  @Input('yueUiFormularyNumberAppend')
  public append!: YueUiSmartRenderType;

  @Input('yueUiFormularyNumberInitialFocus')
  public initialFocus = false;

  @Input('yueUiFormularyNumberAllowClear')
  public allowClear = true;

  @Input('yueUiFormularyNumberId')
  public id = hash();

  @Input('yueUiFormularyNumberPlaceholder')
  public placeholder: Observable<string> | string | null = '';

  @Output('yueUiFormularyNumberFocus')
  public onFocus: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyNumberBlur')
  public onBlur: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyNumberKeydown')
  public onKeydown: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyNumberKeyup')
  public onKeyup: EventEmitter<any> = new EventEmitter();

  private _val: any = null;

  public set value(v: any) {
    this._val = v;
    this.onChange(this._val);
    this.onTouch();
  }

  public get value(): any {
    return this._val;
  }

  constructor(public readonly cdr: ChangeDetectorRef) {
    super();
  }

  public writeValue(value: any): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  public setDisabledState(isDisabled?: boolean): void {
    if (typeof isDisabled === 'boolean') {
      this.disabled = isDisabled;
      this.cdr.markForCheck();
    }
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void { }

}
