import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { equals } from '@joaopedro61/yue-ui/core/utils';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FieldAbstraction } from './abstraction';



@Component({
  template: `
    <yue-ui-formulary-number
      [formControl]="abstractControl"
      [yueUiFormularyNumberPlaceholder]="placeholder"
      [yueUiFormularyNumberInitialFocus]="useInitialFocus"
      [yueUiFormularyNumberId]="identifier"
      [yueUiFormularyNumberPrepend]="fieldPrepend"
      [yueUiFormularyNumberAppend]="fieldAppend"

      (yueUiFormularyNumberFocus)="listeners('focus', $event)"
      (yueUiFormularyNumberBlur)="listeners('blur', $event)"

      (yueUiFormularyNumberKeydown)="listeners('keydown', $event)"
      (yueUiFormularyNumberKeyup)="listeners('keyup', $event)"

      (click)="listeners('click', $event)"
      (mousedown)="listeners('mousedown', $event)"
      (mouseup)="listeners('mouseup', $event)"
      (mouseenter)="listeners('mouseenter', $event)"
      (mouseleave)="listeners('mouseleave', $event)"
    ></yue-ui-formulary-number>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.number-abstraction]': 'true'
  },
  exportAs: 'numberAbstractionRef',
})
export class NumberAbstractionComponent extends FieldAbstraction implements OnInit, OnDestroy {
  
  public destroy$: Subject<void> = new Subject<void>();

  constructor() {
    super();
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
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
