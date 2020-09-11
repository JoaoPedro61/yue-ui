import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable } from 'rxjs';
import { hash } from '@joaopedro61/yue-ui/core/utils';



@Component({
  selector: 'yue-ui-number',
  template: `
  <div class="field-text-wrapper" [class.hovering]="hovering">
    <input
      [id]="yueUiNumberId"
      type="number"
      [(ngModel)]="value"
      [placeholder]="placeholderIsAObservable ? (ngSafeValue_yueUiNumberPlaceholder | async) : yueUiNumberPlaceholder"
      (mouseover)="hovering = true;"
      (mouseout)="hovering = false;"
      [attr.cdkFocusInitial]="yueUiNumberInitialFocus"
    >
    <ng-container *ngIf="yueUiNumberAllowClear">
      <div class="input-clear" (mouseover)="hovering = true;" (mouseout)="hovering = false;">
        <ng-container *ngIf="!disabled && !isEmpty">
          <span class="input-clear-wrapper">
            <span class="input-clear-handler" (click)="clear();">
              <svg width="12" height="12" viewBox="0 0 24 24" focusable="false" role="presentation">
                <path
                  d="M13 11V3.993A.997.997 0 0 0 12 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 0 0 3 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0 0 21 12c0-.556-.445-1-.993-1H13z"
                  fill="currentColor" fill-rule="evenodd"></path>
              </svg>
            </span>
          </span>
        </ng-container>
      </div>
    </ng-container>
  </div>
  `,
  styleUrls: [
    './../styles/number.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiNumberComponent),
      multi: true,
    }
  ],
})
export class YueUiNumberComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  public hovering = false;

  @Input()
  public yueUiNumberInitialFocus = false;

  @Input()
  public yueUiNumberAllowClear = true;

  @Input()
  public yueUiNumberId = hash();

  @Input()
  public yueUiNumberPlaceholder: Observable<string> | string | null = '';

  private _val: any = null;

  public set value(v: any) {
    this._val = v;
    this.onChange(this._val);
    this.onTouch();
  }

  public get value(): any {
    return this._val;
  }

  private _disabled: boolean = false;

  public set disabled(v: boolean) {
    this._disabled = v;
    this.cdr.detectChanges();
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  public get placeholderIsAObservable(): boolean {
    return this.yueUiNumberPlaceholder instanceof Observable;
  }

  public get ngSafeValue_yueUiNumberPlaceholder(): any {
    return this.yueUiNumberPlaceholder;
  }

  public onChange: (newValue: any) => void = () => { };

  public onTouch: () => void = () => { };

  public get isEmpty(): boolean {
    return !(this._val
      ? (this._val + '').length
      : typeof this._val === 'number'
        ? false
        : this._val);
  }

  constructor(private readonly cdr: ChangeDetectorRef) { }

  public mType(c: any): string {
    return typeof c;
  }

  public clear(): void {
    this.value = null;
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

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void { }

}
