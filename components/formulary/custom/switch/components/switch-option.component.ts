import { Component, ChangeDetectionStrategy, Host, Optional, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';

import { equals } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { YueUiSwitchComponent } from './switch.component';



@Component({
  selector: `yue-ui-switch-option`,
  template: `
    <div class="yue-ui-switch-option-wrapper">
      <div class="yue-ui-switch-option-indicator" (click)="setValue();">
        <div class="yue-ui-switch-option-indicator-wrapper">
          <div class="yue-ui-switch-option-indicator-dot">
          </div>
        </div>
      </div>
      <div class="yue-ui-switch-option-label">
        <div class="yue-ui-switch-option-label-wrapper" (click)="setValue();" [attr.cdkFocusInitial]="initialFocus">
          <ng-container *ngIf="yueUiSwitchOptionLabel; else labelContent">
            <yue-ui-smart-render
              [yueUiSmartRender]="yueUiSwitchOptionLabel"
              [yueUiSmartRenderContext]="context">
            </yue-ui-smart-render>
          </ng-container>
          <ng-template #labelContent>
            <ng-content select="*:not(yue-ui-switch-option)"></ng-content>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    `./../styles/switch-option.component.less`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-switch-option]': 'true',
    '[class.yue-ui-switch-option-disabled]': 'isDisabled',
    '[class.yue-ui-switch-option-selected]': 'isSelected',
  }
})
export class YueUiSwitchOptionComponent implements OnInit, OnDestroy {

  @Input()
  public yueUiSwitchOptionValue!: any;

  @Input()
  public yueUiSwitchOptionLabel!: YueUiSmartRenderType;

  @Input()
  public yueUiSwitchOptionDisabled: boolean = false;

  private _fn: (value: any) => void = () => void 0;

  private _parentValue!: any;

  private _parentDisabled = false;

  public get isDisabled(): boolean {
    return this._parentDisabled || this.yueUiSwitchOptionDisabled;
  }

  public get context(): {[x: string]: any} {
    return {
      optionValue: this.yueUiSwitchOptionValue,
      value: this._parentValue,
    }
  }

  public get isSelected(): boolean {
    if (typeof this._parentValue !== 'undefined') {
      return equals(this._parentValue, this.yueUiSwitchOptionValue);
    }
    return false;
  }

  public get initialFocus(): boolean {
    if (this.parent) {
      return this.parent.yueUiSwitchInitialFocus && this.parent.optionIndex(this) === 0;
    }
    return false;
  }

  constructor(private readonly cdr: ChangeDetectorRef, @Optional() @Host() private parent: YueUiSwitchComponent) { }

  private _setValue(value: any): void {
    if (this.isDisabled) return void 0;
    if (typeof this._fn === 'function') {
      this._fn.call(this, value);
    }
    this.cdr.detectChanges();
  }

  public setValue(): void {
    this._setValue(this.yueUiSwitchOptionValue);
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
