import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, AfterViewInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { YueUiFormularyMask } from '@joaopedro61/yue-ui/formulary/mask';
import { hash } from '@joaopedro61/yue-ui/core/utils';

import { FieldBase } from '@joaopedro61/yue-ui/formulary/utils';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-formulary-password',
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
          [type]="mode"
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
          [type]="mode"
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
      useExisting: forwardRef(() => YueUiFormularyPasswordComponent),
      multi: true,
    }
  ],
  host: {
    '[class.yue-ui-formulary-password]': `true`,
    '[class.yue-ui-formulary-field]': `true`,
  }
})
export class YueUiFormularyPasswordComponent extends FieldBase implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input('yueUiFormularyPasswordPrepend')
  public prepend!: YueUiSmartRenderType;

  @Input('yueUiFormularyPasswordAppend')
  public append!: YueUiSmartRenderType;

  @Input('yueUiFormularyPasswordInitialFocus')
  public initialFocus = false;

  @Input('yueUiFormularyPasswordAllowClear')
  public allowClear = true;

  @Input('yueUiFormularyPasswordMask')
  public mask!: YueUiFormularyMask;

  @Input('yueUiFormularyPasswordId')
  public id = hash();

  @Input('yueUiFormularyPasswordPlaceholder')
  public placeholder: Observable<string> | string | null = '';

  @Input('yueUiFormularyPasswordDisable')
  public set reactiveDisabled(value: boolean) {
    this.setDisabledState(value);
  }

  @Input('yueUiFormularyPasswordShow')
  public show = false;

  @Input('yueUiFormularyPasswordShowToggle')
  public showToggle = false;

  @Output('yueUiFormularyPasswordFocus')
  public onFocus: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyPasswordBlur')
  public onBlur: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyPasswordKeydown')
  public onKeydown: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyPasswordKeyup')
  public onKeyup: EventEmitter<any> = new EventEmitter();

  public get mode(): string {
    return this.show ? `text` : `password`;
  }
  
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
