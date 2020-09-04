import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { TextMask } from '@joaopedro61/yue-ui/formulary/utils';




@Component({
  selector: 'yue-ui-password',
  template: `
  <div class="field-password-wrapper" [class.hovering]="hovering">
    <ng-container *ngIf="yueUiPasswordMask; else nomask">
      <input
        [type]="mode"
        [(ngModel)]="value"
        [placeholder]="placeholderIsAObservable ? (ngSafeValue_yueUiPasswordPlaceholder | async) : yueUiPasswordPlaceholder"
        (mouseover)="hovering = true;"
        (mouseout)="hovering = false;"
        [textMask]="yueUiPasswordMask"
      >
    </ng-container>
    <ng-template #nomask>
      <input
        [type]="mode"
        [(ngModel)]="value"
        [placeholder]="placeholderIsAObservable ? (ngSafeValue_yueUiPasswordPlaceholder | async) : yueUiPasswordPlaceholder"
        (mouseover)="hovering = true;"
        (mouseout)="hovering = false;"
      >
    </ng-template>
    <ng-container *ngIf="yueUiPasswordAllowClear">
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
    './../styles/password.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiPasswordComponent),
      multi: true,
    }
  ],
})
export class YueUiPasswordComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  @Input()
  public yueUiPasswordAllowClear = true;

  @Input()
  public yueUiPasswordMask!: TextMask;

  @Input()
  public yueUiPasswordPlaceholder: Observable<string> | string | null = '';

  @Input()
  public yueUiPasswordShow = false;

  @Input()
  public yueUiPasswordShowToggle = false;

  private _val: any = null;

  public get mode(): string {
    return this.yueUiPasswordShow ? `text` : `password`;
  }

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
    return this.yueUiPasswordPlaceholder instanceof Observable;
  }

  public get ngSafeValue_yueUiPasswordPlaceholder(): any {
    return this.yueUiPasswordPlaceholder;
  }

  public hovering = false;

  public onChange: (newValue: any) => void = () => { };

  public onTouch: () => void = () => { };

  public get isEmpty(): boolean {
    return !(this._val ? this._val.length : this._val);
  }

  constructor(private readonly cdr: ChangeDetectorRef) { }

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
