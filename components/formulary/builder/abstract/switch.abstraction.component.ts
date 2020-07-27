import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { AddGettersOnOptions } from './../utils/getter-setter-options';
import { FieldAbstraction } from './abstraction';



@Component({
  template: `
  <yue-ui-switch [yueUiSwitchType]="field.mode" [formControl]="abstractControl">
    <yue-ui-switch-option
      *ngFor="let option of fieldOptions$ | async"
      [yueUiSwitchOptionLabel]="option.labelProped"
      [yueUiSwitchOptionValue]="option.valueProped"
      [yueUiSwitchOptionDisabled]="option.isDisabled"
    >
    </yue-ui-switch-option>
  </yue-ui-switch>
  `,
  styleUrls: [
    `./../styles/switch.abstraction.component.less`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.switch-abstraction]': 'true'
  },
  exportAs: 'switchAbstractionRef',
})
export class SwitchAbstractionComponent extends FieldAbstraction implements AfterViewInit, OnDestroy {

  public fieldOptions$: BehaviorSubject<any[]> = new BehaviorSubject<{ [x: string]: any }[]>([]);

  constructor(private readonly cdr: ChangeDetectorRef) {
    super();
  }

  private _updateOptions(options: any[]): void {
    const label = this.field.properties && 'label' in this.field.properties ? this.field.properties.label : 'label';
    const value = this.field.properties && 'value' in this.field.properties ? this.field.properties.value : 'value';
    const result = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i]) {
        result.push(AddGettersOnOptions(options[i], label, value));
      }
    }
    this.fieldOptions$.next(result);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  private _setOptions(): void {
    if (this.field && this.field.options) {
      if (Array.isArray(this.field.options)) {
        this._updateOptions(this.field.options || []);
      } else if (typeof this.field.options === 'function') {
        const retum = this.field.options(this.abstractControl, this.formGroup, this.field);
        if (retum) {
          if (Array.isArray(retum)) {
            this._updateOptions(retum);
          } else if (typeof retum === 'object' && typeof retum.subscribe === 'function') {
            retum
              .pipe(take(1))
              .subscribe({
                next: (data: any) => {
                  if (Array.isArray(data) && typeof data === 'object') {
                    // @ts-ignore
                    if (data.data) {
                      // @ts-ignore
                      this._updateOptions(data.data);
                    }
                  } else if (Array.isArray(data)) {
                    this._updateOptions(data);
                  } else {
                    this._updateOptions([]);
                  }
                },
                error: () => {
                  this._updateOptions([]);
                }
              });
          }
        }
      } else if (typeof this.field.options === 'object' && typeof this.field.options.subscribe === 'function') {
        this.field.options
          .pipe(take(1))
          .subscribe({
            next: (data: any) => {
              if (Array.isArray(data) && typeof data === 'object') {
                // @ts-ignore
                if (data.data) {
                  // @ts-ignore
                  this._updateOptions(data.data);
                }
              } else if (Array.isArray(data)) {
                this._updateOptions(data);
              } else {
                this._updateOptions([]);
              }
            },
            error: () => {
              this._updateOptions([]);
            }
          });
      }
    }
  }

  public ngAfterViewInit(): void {
    this._setOptions();
  }

  public ngOnDestroy(): void {
    this.fieldOptions$.complete();
  }

}