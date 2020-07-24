import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, TemplateRef, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'yue-ui-switch',
  template: `
  `,
  styleUrls: [
    './../styles/switch.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiSwitchComponent),
      multi: true,
    }
  ],
})
export class YueUiSwitchComponent implements OnInit, ControlValueAccessor {

  private _val: any = null;

  public set value(v: any) {
    this._val = v;
    this.onChange(this._val);
    this.onTouch();
  }

  public onChange: (newValue: any) => void = () => { };

  public onTouch: () => void = () => { };

  public get isIndeterminated(): boolean {
    return this._val === null;
  }

  @Input()
  public yueUiSwitchType: 'normal' | 'indeterminate' | 'radio' = 'normal';

  @Input()
  public yueUiSwitchOnLabel: string | TemplateRef<any> | Type<any> | Observable<string> = '';

  @Input()
  public yueUiSwitchOffLabel: string | TemplateRef<any> | Type<any> | Observable<string> = '';

  constructor(private readonly detector: ChangeDetectorRef) { }

  public assignNewValue(radioValue?: any): void {
    if (this.yueUiSwitchType === 'indeterminate') {
      if (typeof this._val === 'boolean') {
        if (!this._val) {
          this.value = null;
        } else {
          this.value = false;
        }
      } else {
        if (this._val === null) {
          this.value = true;
        }
      }
    } else if (this.yueUiSwitchType === 'normal') {
      if (typeof this._val === 'boolean') {
        if (!this._val) {
          this.value = true;
        } else {
          this.value = false;
        }
      } else {
        if (this._val === null) {
          this.value = true;
        }
      }
    } else {
      this.value = radioValue;
    }
    this.detector.detectChanges();
  }

  public writeValue(value: any): void {
    this.value = value;
    this.detector.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public ngOnInit(): void { }

}


/* 




import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
  selector: 'yue-ui-switch',
  template: `
    <div class="checker-wrapper">
      <ng-container *ngIf="type === 'normal'">
        <div class="normal-checker" [class.focusing]="isfocusing" [class.disabled]="isDisabled">
          <ng-container *ngIf="!isAbstract">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              (change)="changed()" [value]="modelValue">
          </ng-container>
          <ng-container *ngIf="isAbstract">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              [formControl]="abstractControl">
          </ng-container>
          <span class="labels">
            <span class="active" [innerHTML]="activeLabel"></span>
            <span class="unactive" [innerHTML]="unactiveLabel"></span>
          </span>
          <span class="handler"></span>
        </div>
      </ng-container>
      <ng-container *ngIf="type === 'indeterminate'">
        <div class="indeterminate-checker" [class.indeterminate]="isIndeterminated" [class.focusing]="isfocusing"
          [class.disabled]="isDisabled">
          <ng-container *ngIf="!isAbstract">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              (change)="changed()" [value]="modelValue">
          </ng-container>
          <ng-container *ngIf="isAbstract">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              [formControl]="abstractControl" (change)="changed()">
          </ng-container>
          <span class="labels">
            <span class="active" [innerHTML]="activeLabel"></span>
            <span class="unactive" [innerHTML]="unactiveLabel"></span>
          </span>
          <span class="handler"></span>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: [
    './../styles/switch.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiSwitchComponent),
      multi: true,
    }
  ],
})
export class YueUiSwitchComponent implements OnInit, ControlValueAccessor {

  private model$!: boolean | null;

  private oldValue: any;

  public isfocusing = false;

  @Output() public modelChange: EventEmitter<boolean | null> = new EventEmitter();

  @Input() public abstractControl!: FormControl;

  @Input() public disabled!: boolean;

  @Input() public onLabel!: string;

  @Input() public offLabel!: string;

  @Input()
  public get model() {
    return this.model$;
  }

  public set model(val: boolean | null) {
    this.model$ = val;
    this.modelChange.emit(this.model$);
  }

  @Input() public type: 'normal' | 'indeterminate' | 'radio' = 'normal';

  public get modelValue(): any {
    if (this.abstractControl) {
      if (`string` === typeof this.abstractControl.value) {
        if (this.abstractControl.value === `true`) {
          return true;
        }
        return false;
      }
      return this.abstractControl.value;
    } else {
      return this.model;
    }
  }

  public get isDisabled(): boolean {
    if (this.abstractControl) {
      return this.abstractControl.disabled;
    } else {
      return !!this.disabled;
    }
  }

  public get isAbstract(): boolean {
    return !!this.abstractControl;
  }

  public get activeLabel(): string {
    return this.onLabel || '';
  }

  public get unactiveLabel(): string {
    return this.offLabel || '';
  }

  public get isIndeterminated(): boolean {
    return this.oldValue === null;
  }

  constructor(private readonly detector: ChangeDetectorRef) { }

  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }

  public changed(): void {
    if (this.type === 'indeterminate') {
      if (this.abstractControl) {
        if (typeof this.oldValue === 'boolean') {
          if (!this.oldValue) {
            this.abstractControl.setValue(null);
            this.oldValue = null;
          } else {
            this.abstractControl.setValue(false);
            this.oldValue = false;
          }
        } else {
          if (this.oldValue === null) {
            this.abstractControl.setValue(true);
            this.oldValue = true;
          }
        }
      }
    } else {
      if (!this.abstractControl) {
      }
    }
    this.detector.detectChanges();
  }

  public ngOnInit(): void {
    if (this.abstractControl) {
      this.oldValue = this.abstractControl.value;
    }
  }

}

*/

