import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { YueUiSmartRenderType } from '@JoaoPedro61/yue-ui/smart-render';

import { YueUiSwitchOptionComponent } from './switch-option.component';



@Component({
  selector: 'yue-ui-switch',
  template: `
    <div class="checker-wrapper">
      <ng-container *ngIf="yueUiSwitchType">
        <ng-container *ngIf="yueUiSwitchType === 'normal'">
          <div class="normal-checker" [class.focusing]="isfocusing" [class.disabled]="disabled">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              (change)="assignNewValue()" [ngModel]="value">
            <span class="labels">
              <span class="active">
                <yue-ui-smart-render [yueUiSmartRender]="yueUiSwitchOnLabel"></yue-ui-smart-render>
              </span>
              <span class="unactive">
                <yue-ui-smart-render [yueUiSmartRender]="yueUiSwitchOffLabel"></yue-ui-smart-render>
              </span>
            </span>
            <span class="handler"></span>
          </div>
        </ng-container>
        <ng-container *ngIf="yueUiSwitchType === 'indeterminate'">
          <div class="indeterminate-checker" [class.indeterminate]="isIndeterminated" [class.focusing]="isfocusing"
            [class.disabled]="disabled">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              (change)="assignNewValue()" [ngModel]="value">
            <span class="labels">
              <span class="active">
                <yue-ui-smart-render [yueUiSmartRender]="yueUiSwitchOnLabel"></yue-ui-smart-render>
              </span>
              <span class="unactive">
                <yue-ui-smart-render [yueUiSmartRender]="yueUiSwitchOffLabel"></yue-ui-smart-render>
              </span>
            </span>
            <span class="handler"></span>
          </div>
        </ng-container>
        <ng-container *ngIf="yueUiSwitchType === 'radio'">
          <ng-content select="yue-ui-switch-option"></ng-content>
        </ng-container>
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
export class YueUiSwitchComponent implements OnInit, ControlValueAccessor, AfterViewInit {

  public isfocusing = false;

  @Input()
  public yueUiSwitchType: 'normal' | 'indeterminate' | 'radio' = 'normal';

  @Input()
  public yueUiSwitchOnLabel: YueUiSmartRenderType = '';

  @Input()
  public yueUiSwitchOffLabel: YueUiSmartRenderType = '';

  private _options: YueUiSwitchOptionComponent[] = [];

  private _val: any = null;

  public set value(v: any) {
    this._val = v;
    this.onChange(this._val);
    this.onTouch();
    this._updateChildValues();
  }

  public get value(): any {
    return this._val;
  }

  private _disabled: boolean = false;

  public set disabled(v: boolean) {
    this._disabled = v;
    this.detector.detectChanges();
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  public onChange: (newValue: any) => void = () => { };

  public onTouch: () => void = () => { };

  public get isIndeterminated(): boolean {
    return this._val === null;
  }

  constructor(private readonly detector: ChangeDetectorRef) { }

  private _selOptionValue(value: any): void {
    this.assignNewValue(value);
  }

  private _updateChildValues(): void {
    this._options.forEach(o => {
      o.updateParentValue(this._val);
      o.setDisabled(this._disabled);
    });
  }

  public assignNewValue(radioValue?: any): void {
    if (typeof radioValue === 'boolean') {
      this.value = radioValue;
    } else {
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
    }
    this.detector.detectChanges();
  }

  public writeValue(value: any): void {
    this.value = value;
    this.assignNewValue(value);
    this._updateChildValues();
    this.detector.markForCheck();
  }

  public setDisabledState(isDisabled?: boolean): void {
    if (typeof isDisabled === 'boolean') {
      this.disabled = isDisabled;
      this._updateChildValues();
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public addOption(option: YueUiSwitchOptionComponent): void {
    option.setSelectCallback(this._selOptionValue.bind(this));
    this._options.push(option);
  }

  public removeOption(option: YueUiSwitchOptionComponent): void {
    this._options.splice(this._options.indexOf(option), 1);
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this._updateChildValues();
  }

}
