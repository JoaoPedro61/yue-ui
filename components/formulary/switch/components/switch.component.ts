import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, AfterViewInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { hash } from '@joaopedro61/yue-ui/core/utils';

import { FieldBase } from '@joaopedro61/yue-ui/formulary/utils';

import { YueUiFormularySwitchModes } from './../utils/interfaces';

import { YueUiFormularySwitchOptionComponent } from './switch-option.component';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-formulary-switch',
  template: `
    <div class="yue-ui-formulary-switch-wrapper">
      <div class="yue-ui-formulary-switch-wrapper-inner">
        <ng-container *ngIf="!isRadio; else radioTpm">
          <div class="yue-ui-formulary-switch-wrapper-inner-field"
            [class.checkbox-typed]="normalOrIndeterminateCheckboxType"
            [class.button-typed]="normalIndeterminateOrRadioButtonType"
            [class.isIndeterminated]="isIndeterminated"
            [class.isNormal]="isNormal"
            [class.focusing]="isfocusing"
            [class.disabled]="disabled"
          >
            <input
              *ngIf="!normalIndeterminateOrRadioButtonType"
              [id]="id"
              class="yue-ui-formulary-switch-wrapper-inner-field-checkbox"
              type="checkbox"
              (focus)="isfocusing = true; onFocus.emit($event);"
              (blur)="isfocusing = false; onBlur.emit($event);"
              (change)="assignNewValue()"
              [attr.cdkFocusInitial]="initialFocus"
              [ngModel]="value"
              [ngModelOptions]="{ standalone: true }"
              [disabled]="disabled"
            >
            <ng-container *ngIf="allowShowLabels; else dotHandlerTmp">
              <div class="yue-ui-formulary-switch-wrapper-inner-field-buttons">
                <button class="yue-ui-formulary-switch-wrapper-inner-field-buttons-button" (click)="assignNewValue(false, true);" [class.selected]="value === false">
                  <ng-container *ngIf="offLabel; else noOffLabel">
                    <yue-ui-smart-render [yueUiSmartRender]="offLabel"></yue-ui-smart-render>
                  </ng-container>
                  <ng-template #noOffLabel>
                    <yue-ui-i18n yueUiI18nToken="components.switch.offLabel" [yueUiI18nParameters]="{ default: 'Off' }"></yue-ui-i18n>
                  </ng-template>
                </button>
                <ng-container *ngIf="isIndeterminate">
                  <button class="yue-ui-formulary-switch-wrapper-inner-field-buttons-button" (click)="assignNewValue(null, true);" [class.selected]="isIndeterminated">
                    --
                  </button>
                </ng-container>
                <button class="yue-ui-formulary-switch-wrapper-inner-field-buttons-button" (click)="assignNewValue(true, true);" [class.selected]="value === true">
                  <ng-container *ngIf="onLabel; else noOnLabel">
                    <yue-ui-smart-render [yueUiSmartRender]="onLabel"></yue-ui-smart-render>
                  </ng-container>
                  <ng-template #noOnLabel>
                    <yue-ui-i18n yueUiI18nToken="components.switch.onLabel" [yueUiI18nParameters]="{ default: 'On' }"></yue-ui-i18n>
                  </ng-template>
                </button>
              </div>
            </ng-container>
            <ng-template #dotHandlerTmp>
              <span class="yue-ui-formulary-switch-wrapper-inner-field-handler wrappred-handler"></span>
            </ng-template>
          </div>
        </ng-container>
        <ng-template #radioTpm>
          <div
            class="yue-ui-formulary-switch-wrapper-inner-radio-field"
            [class.button-typed]="normalIndeterminateOrRadioButtonType"
            [class.focusing]="isfocusing"
            [class.disabled]="disabled"
          >
            <ng-content select="yue-ui-formulary-switch-option"></ng-content>
          </div>
        </ng-template>
      </div>
      <ng-container *ngIf="allowShowPlaceholder">
        <div class="yue-ui-formulary-switch-wrapper-placeholder" (click)="assignNewValue();">
          <yue-ui-smart-render [yueUiSmartRender]="placeholder"></yue-ui-smart-render>
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiFormularySwitchComponent),
      multi: true,
    }
  ],
  host: {
    '[class.yue-ui-formulary-switch]': `true`,
    '[class.yue-ui-formulary-field]': `true`,
    '[class.yue-ui-formulary-switch-focusing]': `isfocusing`,
    '[class.yue-ui-formulary-switch-disabled]': `disabled`,
    '[class.yue-ui-formulary-switch-normal]': `syncedMode === 'normal'`,
    '[class.yue-ui-formulary-switch-normal-checkbox]': `syncedMode === 'normal-checkbox'`,
    '[class.yue-ui-formulary-switch-normal-button]': `syncedMode === 'normal-button'`,
    '[class.yue-ui-formulary-switch-indeterminate]': `syncedMode === 'indeterminate'`,
    '[class.yue-ui-formulary-switch-indeterminate-checkbox]': `syncedMode === 'indeterminate-checkbox'`,
    '[class.yue-ui-formulary-switch-indeterminate-button]': `syncedMode === 'indeterminate-button'`,
    '[class.yue-ui-formulary-switch-radio]': `syncedMode === 'radio'`,
    '[class.yue-ui-formulary-switch-radio-button]': `syncedMode === 'radio-button'`,
  }
})
export class YueUiFormularySwitchComponent extends FieldBase implements OnInit, ControlValueAccessor, AfterViewInit {

  public isfocusing = false;

  @Input('yueUiFormularySwitchInitialFocus')
  public initialFocus = false;

  @Input('yueUiFormularySwitchId')
  public id = hash();

  @Input('yueUiFormularySwitchPlaceholder')
  public placeholder: Observable<string> | string | null = '';

  @Input('yueUiFormularySwitchMode')
  public mode: YueUiFormularySwitchModes = 'normal-checkbox';

  @Input('yueUiFormularySwitchOnLabel')
  public onLabel!: YueUiSmartRenderType;

  @Input('yueUiFormularySwitchOffLabel')
  public offLabel!: YueUiSmartRenderType;

  @Output('yueUiFormularySwitchFocus')
  public onFocus: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularySwitchBlur')
  public onBlur: EventEmitter<any> = new EventEmitter();

  private _val: any = null;

  public set value(v: any) {
    this._val = v;
    this.onChange(this._val);
    this.onTouch();
  }

  public get value(): any {
    return this._val;
  }

  public get isIndeterminated(): boolean {
    return this._val === null;
  }

  public get syncedMode(): YueUiFormularySwitchModes {
    if (this.mode) {
      return this.mode;
    }
    return 'normal';
  }

  public get isRadio(): boolean {
    return this.syncedMode === 'radio' || this.syncedMode === 'radio-button';
  }

  public get isIndeterminate(): boolean {
    return this.syncedMode === 'indeterminate'
      || this.syncedMode === 'indeterminate-checkbox'
      || this.syncedMode === 'indeterminate-button';
  }

  public get isNormal(): boolean {
    return this.syncedMode === 'normal'
      || this.syncedMode === 'normal-checkbox'
      || this.syncedMode === 'normal-button';
  }

  public get normalOrIndeterminateCheckboxType(): boolean {
    return this.syncedMode === 'normal-checkbox' || this.syncedMode === 'indeterminate-checkbox';
  }

  public get normalIndeterminateOrRadioButtonType(): boolean {
    return this.syncedMode === 'normal-button' || this.syncedMode === 'indeterminate-button' || this.syncedMode === 'radio-button';
  }

  public get allowShowLabels(): boolean {
    return !this.isRadio ? this.syncedMode === 'indeterminate-button' || this.syncedMode === 'normal-button' : false;
  }

  public get allowShowPlaceholder(): boolean {
    return this.isNormal || this.isIndeterminate;
  }

  private _options: YueUiFormularySwitchOptionComponent[] = [];

  constructor(public readonly cdr: ChangeDetectorRef) {
    super();
  }

  private _selOptionValue(value: any): void {
    this.assignNewValue(value);
  }

  private _updateChildValues(): void {
    this._options.forEach(o => {
      o.updateParentValue(this._val);
      o.setDisabled(this.disabled);
    });
  }

  public assignNewValue(radioValue?: any, override: boolean = false): void {
    if (this.disabled) {
      return void 0;
    }
    if (override) {
      this.value = radioValue;
    } else {
      if (typeof radioValue === 'boolean') {
        this.value = radioValue;
      } else {
        if (this.isIndeterminate) {
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
        } else if (this.isNormal) {
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
    }
    this.cdr.detectChanges();
    this._updateChildValues();
  }

  public writeValue(value: any): void {
    this.value = value;
    this.assignNewValue(value);
    this._updateChildValues();
    this.cdr.markForCheck();
  }

  public setDisabledState(isDisabled?: boolean): void {
    if (typeof isDisabled === 'boolean') {
      this.disabled = isDisabled;
      this.cdr.markForCheck();
    }
  }

  public optionIndex(option: YueUiFormularySwitchOptionComponent): number {
    return this._options.indexOf(option);
  }

  public addOption(option: YueUiFormularySwitchOptionComponent): void {
    option.setSelectCallback(this._selOptionValue.bind(this));
    this._options.push(option);
  }

  public removeOption(option: YueUiFormularySwitchOptionComponent): void {
    this._options.splice(this._options.indexOf(option), 1);
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this._updateChildValues();
  }

}
