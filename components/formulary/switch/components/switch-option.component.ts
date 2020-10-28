import { Component, ChangeDetectionStrategy, Host, Optional, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';

import { equals } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { YueUiFormularySwitchComponent } from './switch.component';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-formulary-switch-option`,
  template: `
    <div class="yue-ui-formulary-switch-option-wrapper">
      <ng-container *ngIf="!buttonStyled">
        <div class="yue-ui-formulary-switch-option-wrapper-indicator" (click)="setValue();">
          <div class="yue-ui-formulary-switch-option-wrapper-indicator-inner">
            <div class="yue-ui-formulary-switch-option-wrapper-indicator-inner-dot"></div>
          </div>
        </div>
      </ng-container>
      <div class="yue-ui-formulary-switch-option-wrapper-label">
        <div class="yue-ui-formulary-switch-option-wrapper-label-inner" (click)="setValue();" [attr.cdkFocusInitial]="initialFocus">
          <ng-container *ngIf="label; else labelContent">
            <yue-ui-smart-render
              [yueUiSmartRender]="label"
              [yueUiSmartRenderContext]="context">
            </yue-ui-smart-render>
          </ng-container>
          <ng-template #labelContent>
            <ng-content select="*:not(yue-ui-formulary-switch-option)"></ng-content>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-formulary-switch-option]': `true`,
    '[class.yue-ui-formulary-switch-option-button]': `buttonStyled`,
    '[class.yue-ui-formulary-switch-option-disabled]': `isDisabled`,
    '[class.yue-ui-formulary-switch-option-selected]': `isSelected`,
    '[class.disabled]': `isDisabled`,
    '[class.selected]': `isSelected`,
  }
})
export class YueUiFormularySwitchOptionComponent implements OnInit, OnDestroy {

  @Input('yueUiFormularySwitchOptionValue')
  public value!: any;

  @Input('yueUiFormularySwitchOptionLabel')
  public label!: YueUiSmartRenderType;

  @Input('yueUiFormularySwitchOptionDisabled')
  public disabled: boolean = false;

  private _fn: (value: any) => void = () => void 0;

  private _parentValue!: any;

  private _parentDisabled = false;

  public get isDisabled(): boolean {
    return this._parentDisabled || this.disabled;
  }

  public get context(): {[x: string]: any} {
    return {
      optionValue: this.value,
      value: this._parentValue,
    }
  }

  public get isSelected(): boolean {
    if (typeof this._parentValue !== 'undefined') {
      return equals(this._parentValue, this.value);
    }
    return false;
  }

  public get buttonStyled(): boolean {
    if (this.parent) {
      return this.parent.normalIndeterminateOrRadioButtonType;
    }
    return false;
  }

  public get initialFocus(): boolean {
    if (this.parent) {
      return this.parent.initialFocus && this.parent.optionIndex(this) === 0;
    }
    return false;
  }

  constructor(private readonly cdr: ChangeDetectorRef, @Optional() @Host() private parent: YueUiFormularySwitchComponent) { }

  private _setValue(value: any): void {
    if (this.isDisabled) return void 0;
    if (typeof this._fn === 'function') {
      this._fn.call(this, value);
    }
    this.cdr.detectChanges();
  }

  public setValue(): void {
    this._setValue(this.value);
  }

  public setDisabled(v: boolean): void {
    this._parentDisabled = v;
    this.cdr.detectChanges();
  }

  public updateParentValue(value: any): void {
    this._parentValue = value;
    this.cdr.detectChanges();
  }

  public setSelectCallback(fn: (value: any) => void): void {
    this._fn = fn;
    this.cdr.detectChanges();
  }

  public ngOnInit(): void {
    if (this.parent) {
      this.parent.addOption(this);
    }
  }

  public ngOnDestroy(): void {
    if (this.parent) {
      this.parent.removeOption(this);
    }
  }

}
