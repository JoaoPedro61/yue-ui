import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, AfterViewInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { YueUiFormularyMask } from '@joaopedro61/yue-ui/formulary/mask';
import { hash } from '@joaopedro61/yue-ui/core/utils';

import { FieldBase } from '@joaopedro61/yue-ui/formulary/utils';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-formulary-textarea',
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
        <textarea
          [id]="id"
          [(ngModel)]="value"
          [placeholder]="placeholderIsAObservable ? ($any(placeholder) | async) : $any(placeholder)"
          [attr.cdkFocusInitial]="initialFocus"
          [rows]="rows"
          [yueUiFormularyMask]="mask"
          [ngModelOptions]="{ standalone: true }"
          [disabled]="disabled"
          (focus)="updateFocus(true); onFocus.emit($event);"
          (blur)="updateFocus(false); onBlur.emit($event);"
          (keydown)="onKeydown.emit($event);"
          (keyup)="onKeyup.emit($event);"
        ></textarea>
      </ng-container>
      <ng-template #nomask>
      <textarea
          [id]="id"
          [(ngModel)]="value"
          [placeholder]="placeholderIsAObservable ? ($any(placeholder) | async) : $any(placeholder)"
          [attr.cdkFocusInitial]="initialFocus"
          [rows]="rows"
          [ngModelOptions]="{ standalone: true }"
          [disabled]="disabled"
          (focus)="updateFocus(true); onFocus.emit($event);"
          (blur)="updateFocus(false); onBlur.emit($event);"
          (keydown)="onKeydown.emit($event);"
          (keyup)="onKeyup.emit($event);"
        ></textarea>
      </ng-template>
    </yue-ui-formulary-field-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiFormularyTextareaComponent),
      multi: true,
    }
  ],
  host: {
    '[class.yue-ui-formulary-textarea]': `true`,
    '[class.yue-ui-formulary-field]': `true`,
  }
})
export class YueUiFormularyTextareaComponent extends FieldBase implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input('yueUiFormularyTextareaPrepend')
  public prepend!: YueUiSmartRenderType;

  @Input('yueUiFormularyTextareaAppend')
  public append!: YueUiSmartRenderType;

  @Input('yueUiFormularyTextareaInitialFocus')
  public initialFocus = false;

  @Input('yueUiFormularyTextareaAllowClear')
  public allowClear = true;

  @Input('yueUiFormularyTextareaMask')
  public mask!: YueUiFormularyMask;

  @Input('yueUiFormularyTextareaRows')
  public rows = 3;

  @Input('yueUiFormularyTextareaId')
  public id = hash();

  @Input('yueUiFormularyTextareaPlaceholder')
  public placeholder: Observable<string> | string | null = '';

  @Output('yueUiFormularyTextareaFocus')
  public onFocus: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyTextareaBlur')
  public onBlur: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyTextareaKeydown')
  public onKeydown: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularyTextareaKeyup')
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
