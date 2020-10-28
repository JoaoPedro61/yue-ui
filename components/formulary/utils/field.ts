import { ChangeDetectorRef, Directive, EventEmitter } from "@angular/core";
import { hash, deepTypeChecker } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';
import { YueUiFormularyMask } from '@joaopedro61/yue-ui/formulary/mask';
import { Observable } from 'rxjs';



@Directive()
export abstract class FieldBase {

  public focused = false;

  public abstract value: any;

  public abstract readonly cdr: ChangeDetectorRef;

  public prepend?: YueUiSmartRenderType;

  public append?: YueUiSmartRenderType;

  public initialFocus = false;

  public allowClear = true;

  public mask?: YueUiFormularyMask;

  public id = hash();

  public placeholder: Observable<string> | string | null = '';

  public onFocus?: EventEmitter<any>;

  public onBlur?: EventEmitter<any>;

  public onKeydown?: EventEmitter<any>;

  public onKeyup?: EventEmitter<any>;

  private _disabled: boolean = false;

  public onChange: (newValue: any) => void = () => { };

  public onTouch: () => void = () => { };

  public clearInput?(): void;

  public beforeClear?(): void;

  public set disabled(v: boolean) {
    this._disabled = v;
    this.cdr.detectChanges();
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  public updateFocus(value: boolean): void {
    if (this.focused !== value) {
      this.focused = value;
      this.cdr.markForCheck();
    }
  }

  public get placeholderIsAObservable(): boolean {
    return this.placeholder instanceof Observable;
  }

  public get isEmpty(): boolean {
    const type = deepTypeChecker(this.value);
    if (type === 'null' || type === 'undefined') {
      return true;
    }
    if (type === 'object') {
      if (Object.keys(this.value).length) {
        return false;
      } else {
        return true;
      }
    }
    if (type === 'array') {
      if (Array.isArray(this.value) && this.value.length) {
        return false;
      } else {
        return true;
      }
    }
    if (type !== 'boolean') {
      if ((this.value + '').length) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public clear(): void {
    if (typeof this.beforeClear === 'function') {
      this.beforeClear();
    }
    this.value = null;
    if (typeof this.clearInput === 'function') {
      this.clearInput();
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
