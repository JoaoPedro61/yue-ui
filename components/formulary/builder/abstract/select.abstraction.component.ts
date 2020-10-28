import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';

import { YueUiFormularySelectMode, YueUiSelectSearchChange } from '@joaopedro61/yue-ui/formulary/select';
import { BehaviorSubject, Subject, Subscription, Observable } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { equals } from '@joaopedro61/yue-ui/core/utils';

import { FieldAbstraction } from './abstraction';




@Component({
  template: `
    <yue-ui-formulary-select
      [formControl]="abstractControl"

      [yueUiFormularySelectPlaceholder]="placeholder"
      [yueUiFormularySelectMask]="mask"
      [yueUiFormularySelectInitialFocus]="useInitialFocus"
      [yueUiFormularySelectId]="identifier"
      [yueUiFormularySelectPrepend]="fieldPrepend"
      [yueUiFormularySelectAppend]="fieldAppend"

      [yueUiFormularySelectMode]="mode"

      [yueUiFormularySelectAllowSearch]="true"
      [yueUiFormularySelectShowArrow]="true"

      [yueUiFormularySelectPropertyLabel]="labelProperty"
      [yueUiFormularySelectPropertyValue]="valueProperty"

      (yueUiFormularySelectFocus)="listeners('focus', $event)"
      (yueUiFormularySelectBlur)="listeners('blur', $event)"

      (yueUiFormularySelectKeydown)="listeners('keydown', $event)"
      (yueUiFormularySelectKeyup)="listeners('keyup', $event)"

      (yueUiFormularySelectOnSearch)="onSearch($event)"
      (yueUiFormularySelectScrollToBottom)="listeners('scrollToBottom', $event)"

      (click)="listeners('click', $event)"
      (mousedown)="listeners('mousedown', $event)"
      (mouseup)="listeners('mouseup', $event)"
      (mouseenter)="listeners('mouseenter', $event)"
      (mouseleave)="listeners('mouseleave', $event)"
    >
      <yue-ui-formulary-select-option *ngFor="let option of options$ | async" [yueUiFormularySelectOptionValue]="option"></yue-ui-formulary-select-option>
    </yue-ui-formulary-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.select-abstraction]': 'true'
  },
  exportAs: 'selectAbstractionRef',
})
export class SelectAbstractionComponent extends FieldAbstraction implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  private subscribeOfOldOptions!: Subscription;

  public options$: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);

  public get labelProperty(): string | false {
    if (this.field && this.field.properties) {
      return this.field.properties.label || `label`;
    }
    return `label`;
  }

  public get valueProperty(): string | false {
    if (this.field && this.field.properties) {
      return this.field.properties.value || `value`;
    }
    return `value`;
  }

  public get mode(): YueUiFormularySelectMode {
    if (this.field) {
      return this.field.mode || `single` as any;
    }
    return `single`;
  }

  constructor() {
    super();
  }

  private updateOptionsScheme(): void {
    if (this.subscribeOfOldOptions) {
      this.subscribeOfOldOptions.unsubscribe();
    }
    if (typeof this.field.options === `function`) {
      const result: any = this.field.options();
      if (Array.isArray(result)) {
        this.options$.next(result);
      } else if ((result instanceof Observable) || (result instanceof BehaviorSubject) || (result instanceof Subject)) {
        this.subscribeOfOldOptions = result.pipe(takeUntil(this.destroy$)).subscribe({
          next: (response) => {
            if (Array.isArray(response)) {
              this.options$.next(response);
            } else if ((typeof response === `object`) && (response.hasOwnProperty(`data`) || response.hasOwnProperty(`list`) || response.hasOwnProperty(`itens`))) {
              if (`data` in response) {
                this.options$.next(response.data || []);
              } else if (`list` in response) {
                this.options$.next(response.list || []);
              } else {
                this.options$.next(response.itens || []);
              }
            } else {
              this.options$.next([]);
              throw "Sorry, but the format acceptable of select field is an array of values!";
            }
          },
          error: () => {
            this.options$.next([]);
          }
        });
      }
    } else if ((this.field.options instanceof Observable) || (this.field.options instanceof BehaviorSubject) || (this.field.options instanceof Subject)) {
      this.subscribeOfOldOptions = (this.field.options as Observable<any>).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.options$.next(response);
          } else if ((typeof response === `object`) && (response.hasOwnProperty(`data`) || response.hasOwnProperty(`list`) || response.hasOwnProperty(`itens`))) {
            if (`data` in response) {
              this.options$.next(response.data || []);
            } else if (`list` in response) {
              this.options$.next(response.list || []);
            } else {
              this.options$.next(response.itens || []);
            }
          } else {
            this.options$.next([]);
            throw "Sorry, but the format acceptable of select field is an array of values!";
          }
        },
        error: () => {
          this.options$.next([]);
        }
      });
    } else if (Array.isArray(this.field.options)) {
      this.options$.next(this.field.options || []);
    } else {
      this.options$.next([]);
    }
  }

  private changesHandler(changes: Partial<any>): void {
    if (!Array.isArray(changes) && typeof changes === `object`) {
      if (changes.hasOwnProperty(`options`)) {
        this.updateOptionsScheme();
      }
    }
  }

  public onSearch(event: YueUiSelectSearchChange): void {
    this.listeners(`search`, [event]);
  }

  public ngOnInit(): void {
    if (this.field) {
      this.field.setChangeHandler(`options`, (changes: any) => this.changesHandler(changes));
      this.updateOptionsScheme();
    }
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
  }

  public ngOnDestroy(): void {
    this.options$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

}
