import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { YueUiSmartRenderType } from '@JoaoPedro61/yue-ui/smart-render';



@Component({
  selector: 'yue-ui-select',
  template: `
  `,
  styleUrls: [
    './../styles/select.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiSelectComponent),
      multi: true,
    }
  ],
})
export class YueUiSelectComponent implements OnInit, ControlValueAccessor, AfterViewInit {

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

  public onChange: (newValue: any) => void = () => { };

  public onTouch: () => void = () => { };

  constructor(private readonly cdr: ChangeDetectorRef) { }

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
