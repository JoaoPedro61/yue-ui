import { Directive, Input, OnInit, ElementRef, HostListener } from '@angular/core';

import { yueUiFormularyMaskValueToFormat } from './../utils/formater';



@Directive({
  selector: `[yueUiFormularyMask]`
})
export class YueUiFormularyMaskDirective implements OnInit {

  @Input('yueUiFormularyMask')
  public mask!: string;

  private inputElem!: HTMLInputElement;

  private _lastMaskedValue = '';

  constructor(private el: ElementRef) { }

  @HostListener('input')
  public onInput(): void {
    this.inputElem.value = this._maskValue(this.inputElem.value);
  }

  private _maskValue(val: string): string {
    if (!val || !this.mask || val === this._lastMaskedValue) {
      return val;
    }
    const maskedVal = this._lastMaskedValue = yueUiFormularyMaskValueToFormat(val, this.mask);
    return maskedVal;
  }

  public ngOnInit() {
    this.inputElem = this.el.nativeElement;
  }

}
