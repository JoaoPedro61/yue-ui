import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, AfterViewInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { YueUiFormularyMask } from '@joaopedro61/yue-ui/formulary/mask';
import { hash } from '@joaopedro61/yue-ui/core/utils';

import { FieldBase } from '@joaopedro61/yue-ui/formulary/utils';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-formulary-text',
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
      <ng-container *ngIf="mask; else nomask">
        <input
          type="text"
          [id]="id"
          [(ngModel)]="value"
          [placeholder]="placeholderIsAObservable ? ($any(placeholder) | async) : $any(placeholder)"
          [attr.cdkFocusInitial]="initialFocus" [attr.autofocus]="initialFocus"
          [yueUiFormularyMask]="mask"
          [ngModelOptions]="{ standalone: true }"
          [disabled]="disabled"
          (focus)="updateFocus(true); onFocus.emit($event);"
          (blur)="updateFocus(false); onBlur.emit($event);"
          (keydown)="onKeydown.emit($event);"
          (keyup)="onKeyup.emit($event);"
        >
      </ng-container>
      <ng-template #nomask>
        <input
          type="text"
          [id]="id"
          [(ngModel)]="value"
          [placeholder]="placeholderIsAObservable ? ($any(placeholder) | async) : $any(placeholder)"
          [attr.cdkFocusInitial]="initialFocus" [attr.autofocus]="initialFocus"
          [ngModelOptions]="{ standalone: true }"
          [disabled]="disabled"
          (focus)="updateFocus(true); onFocus.emit($event);"
          (blur)="updateFocus(false); onBlur.emit($event);"
          (keydown)="onKeydown.emit($event);"
          (keyup)="onKeyup.emit($event);"
        >
      </ng-template>
    </yue-ui-formulary-field-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiFormularyTextComponent),
      multi: true,
    }
  ],
  host: {
    '[class.yue-ui-formulary-text]': `true`,
    '[class.yue-ui-formulary-field]': `true`,
  }
})
export class YueUiFormularyTextComponent extends FieldBase implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input('yueUiFormularyTextPrepend')
  public prepend!: YueUiSmartRenderType;

  @Input('yueUiFormularyTextAppend')
  public append!: YueUiSmartRenderType;

  @Input('yueUiFormularyTextInitialFocus')
  public initialFocus = false;

  @Input('yueUiFormularyTextAllowClear')
  public allowClear = true;

  @Input('yueUiFormularyTextMask')
  public mask!: YueUiFormularyMask;

  @Input('yueUiFormularyTextId')
  public id = hash();

  @Input('yueUiFormularyTextPlaceholder')
  public placeholder: Observable<string> | string | null = '';

  @Input('yueUiFormularyTextDisable')
  public set reactiveDisabled(value: boolean) {
    this.setDisabledState(value);
  }

  @Output('yueUiFormularyTextFocus')
  public onFocus: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyTextBlur')
  public onBlur: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyTextKeydown')
  public onKeydown: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyTextKeyup')
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
