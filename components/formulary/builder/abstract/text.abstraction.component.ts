import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { equals } from '@joaopedro61/yue-ui/core/utils';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FieldAbstraction } from './abstraction';



@Component({
  template: `
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'password'">
        <yue-ui-formulary-password
          [formControl]="abstractControl"
          [yueUiFormularyPasswordPlaceholder]="placeholder"
          [yueUiFormularyPasswordMask]="mask"
          [yueUiFormularyPasswordInitialFocus]="useInitialFocus"
          [yueUiFormularyPasswordId]="identifier"
          [yueUiFormularyPasswordPrepend]="fieldPrepend"
          [yueUiFormularyPasswordAppend]="fieldAppend"

          (yueUiFormularyPasswordFocus)="listeners('focus', $event)"
          (yueUiFormularyPasswordBlur)="listeners('blur', $event)"

          (yueUiFormularyPasswordKeydown)="listeners('keydown', $event)"
          (yueUiFormularyPasswordKeyup)="listeners('keyup', $event)"

          (click)="listeners('click', $event)"
          (mousedown)="listeners('mousedown', $event)"
          (mouseup)="listeners('mouseup', $event)"
          (mouseenter)="listeners('mouseenter', $event)"
          (mouseleave)="listeners('mouseleave', $event)"
        >
        </yue-ui-formulary-password>
      </ng-container>
      <ng-container *ngSwitchCase="'textarea'">
      <yue-ui-formulary-textarea
          [formControl]="abstractControl"
          [yueUiFormularyTextareaPlaceholder]="placeholder"
          [yueUiFormularyTextareaMask]="mask"
          [yueUiFormularyTextareaInitialFocus]="useInitialFocus"
          [yueUiFormularyTextareaId]="identifier"
          [yueUiFormularyTextareaPrepend]="fieldPrepend"
          [yueUiFormularyTextareaAppend]="fieldAppend"

          (yueUiFormularyTextareaFocus)="listeners('focus', $event)"
          (yueUiFormularyTextareaBlur)="listeners('blur', $event)"

          (yueUiFormularyTextareaKeydown)="listeners('keydown', $event)"
          (yueUiFormularyTextareaKeyup)="listeners('keyup', $event)"

          (click)="listeners('click', $event)"
          (mousedown)="listeners('mousedown', $event)"
          (mouseup)="listeners('mouseup', $event)"
          (mouseenter)="listeners('mouseenter', $event)"
          (mouseleave)="listeners('mouseleave', $event)"
        >
        </yue-ui-formulary-textarea>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <yue-ui-formulary-text
          [formControl]="abstractControl"
          [yueUiFormularyTextPlaceholder]="placeholder"
          [yueUiFormularyTextMask]="mask"
          [yueUiFormularyTextInitialFocus]="useInitialFocus"
          [yueUiFormularyTextId]="identifier"
          [yueUiFormularyTextPrepend]="fieldPrepend"
          [yueUiFormularyTextAppend]="fieldAppend"

          (yueUiFormularyTextFocus)="listeners('focus', $event)"
          (yueUiFormularyTextBlur)="listeners('blur', $event)"

          (yueUiFormularyTextKeydown)="listeners('keydown', $event)"
          (yueUiFormularyTextKeyup)="listeners('keyup', $event)"

          (click)="listeners('click', $event)"
          (mousedown)="listeners('mousedown', $event)"
          (mouseup)="listeners('mouseup', $event)"
          (mouseenter)="listeners('mouseenter', $event)"
          (mouseleave)="listeners('mouseleave', $event)"
        >
        </yue-ui-formulary-text>
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.text-abstraction]': 'true'
  },
  exportAs: 'textareaAbstractionRef',
})
export class TextAbstractionComponent extends FieldAbstraction implements OnInit, OnDestroy {
  
  public destroy$: Subject<void> = new Subject<void>();

  public get mode(): string {
    if (this.field) {
      return this.field.mode as string;
    }
    return `text`;
  }

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
