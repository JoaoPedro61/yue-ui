import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ChangeDetectorRef, OnInit, ViewEncapsulation } from '@angular/core';
import { equals } from '@joaopedro61/yue-ui/core/utils';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { AddGettersOnOptions } from './../utils/getter-setter-options';
import { FieldAbstraction } from './abstraction';



@Component({
  encapsulation: ViewEncapsulation.None,
  template: `
  <yue-ui-formulary-switch
    [formControl]="abstractControl"

    [yueUiFormularySwitchMode]="field.mode"
    [yueUiFormularySwitchInitialFocus]="useInitialFocus"
    [yueUiFormularySwitchPlaceholder]="placeholder"

    (click)="listeners('click', $event)"
    (mousedown)="listeners('mousedown', $event)"
    (mouseup)="listeners('mouseup', $event)"
    (mouseenter)="listeners('mouseenter', $event)"
    (mouseleave)="listeners('mouseleave', $event)"
    (yueUiFormularySwitchFocus)="listeners('focus', $event)"
    (yueUiFormularySwitchBlur)="listeners('blur', $event)"
  >
    <yue-ui-formulary-switch-option
      *ngFor="let option of fieldOptions$ | async"
      [yueUiFormularySwitchOptionLabel]="option.labelProped"
      [yueUiFormularySwitchOptionValue]="option.valueProped"
      [yueUiFormularySwitchOptionDisabled]="option.isDisabled"
    >
    </yue-ui-formulary-switch-option>
  </yue-ui-formulary-switch>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.switch-abstraction]': 'true'
  },
  exportAs: 'switchAbstractionRef',
})
export class SwitchAbstractionComponent extends FieldAbstraction implements AfterViewInit, OnDestroy, OnInit {

  private subscribeOfOldOptions!: Subscription;

  public destroy$: Subject<void> = new Subject<void>();

  public fieldOptions$: BehaviorSubject<any[]> = new BehaviorSubject<{ [x: string]: any }[]>([]);

  constructor(private readonly cdr: ChangeDetectorRef) {
    super();
  }

  private _updateOptionsScheme(options: any[]): void {
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

  public updateOptions(externalArgs: any[] = []): void {
    if (this.subscribeOfOldOptions) {
      this.subscribeOfOldOptions.unsubscribe();
    }
    if (typeof this.field.options === `function`) {
      const result: any = this.field.options(this.abstractControl, this.formGroup, this.field, ...externalArgs);
      if (Array.isArray(result)) {
        this._updateOptionsScheme(result);
      } else if ((result instanceof Observable) || (result instanceof BehaviorSubject) || (result instanceof Subject)) {
        this.subscribeOfOldOptions = result.pipe(takeUntil(this.destroy$)).subscribe({
          next: (response) => {
            if (Array.isArray(response)) {
              this._updateOptionsScheme(response);
            } else if ((typeof response === `object`) && (response.hasOwnProperty(`data`) || response.hasOwnProperty(`list`) || response.hasOwnProperty(`itens`))) {
              if (`data` in response) {
                this._updateOptionsScheme(response.data || []);
              } else if (`list` in response) {
                this._updateOptionsScheme(response.list || []);
              } else {
                this._updateOptionsScheme(response.itens || []);
              }
            } else {
              this._updateOptionsScheme([]);
              throw "Sorry, but the format acceptable of switch field is an array of values!";
            }
          },
          error: () => {
            this._updateOptionsScheme([]);
          }
        });
      }
    } else if ((this.field.options instanceof Observable) || (this.field.options instanceof BehaviorSubject) || (this.field.options instanceof Subject)) {
      this.subscribeOfOldOptions = (this.field.options as Observable<any>).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this._updateOptionsScheme(response);
          } else if ((typeof response === `object`) && (response.hasOwnProperty(`data`) || response.hasOwnProperty(`list`) || response.hasOwnProperty(`itens`))) {
            if (`data` in response) {
              this._updateOptionsScheme(response.data || []);
            } else if (`list` in response) {
              this._updateOptionsScheme(response.list || []);
            } else {
              this._updateOptionsScheme(response.itens || []);
            }
          } else {
            this._updateOptionsScheme([]);
            throw "Sorry, but the format acceptable of switch field is an array of values!";
          }
        },
        error: () => {
          this._updateOptionsScheme([]);
        }
      });
    } else if (Array.isArray(this.field.options)) {
      this._updateOptionsScheme(this.field.options || []);
    } else {
      this._updateOptionsScheme([]);
    }
  }

  public ngAfterViewInit(): void {
    this.updateOptions();
    super.ngAfterViewInit();
  }

  public ngOnInit(): void {
    if (this.abstractControl) {
      this.abstractControl
        .valueChanges
        .pipe(takeUntil(this.destroy$), distinctUntilChanged((x, y) => equals(x, y)))
        .subscribe({
          next: (value) => {
            this.listeners(`change`, value);
          }
        });
    }
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    this.fieldOptions$.complete();

    this.destroy$.next();
    this.destroy$.complete();
    super.ngOnDestroy();
  }

}
