import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { equals } from '@joaopedro61/yue-ui/core/utils';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FieldAbstraction } from './abstraction';



@Component({
  template: `
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'password'">
        <yue-ui-password
          [formControl]="abstractControl"
          [yueUiPasswordPlaceholder]="placeholder"
          [yueUiPasswordMask]="mask"
          [yueUiPasswordInitialFocus]="useInitialFocus"
          
          (click)="listeners('click', $event)"
          (mousedown)="listeners('mousedown', $event)"
          (mouseup)="listeners('mouseup', $event)"
          (mouseenter)="listeners('mouseenter', $event)"
          (mouseleave)="listeners('mouseleave', $event)"
          (focus)="listeners('focus', $event)"
          (blur)="listeners('blur', $event)"
        >
        </yue-ui-password>
      </ng-container>
      <ng-container *ngSwitchCase="'textarea'">
        <yue-ui-textarea
          [formControl]="abstractControl"
          [yueUiTextareaPlaceholder]="placeholder"
          [yueUiTextareaMask]="mask"
          [yueUiTextareaInitialFocus]="useInitialFocus"

          (click)="listeners('click', $event)"
          (mousedown)="listeners('mousedown', $event)"
          (mouseup)="listeners('mouseup', $event)"
          (mouseenter)="listeners('mouseenter', $event)"
          (mouseleave)="listeners('mouseleave', $event)"
          (focus)="listeners('focus', $event)"
          (blur)="listeners('blur', $event)"
        ></yue-ui-textarea>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <yue-ui-text
          [formControl]="abstractControl"
          [yueUiTextPlaceholder]="placeholder"
          [yueUiTextMask]="mask"
          [yueUiTextInitialFocus]="useInitialFocus"

          (click)="listeners('click', $event)"
          (mousedown)="listeners('mousedown', $event)"
          (mouseup)="listeners('mouseup', $event)"
          (mouseenter)="listeners('mouseenter', $event)"
          (mouseleave)="listeners('mouseleave', $event)"
          (focus)="listeners('focus', $event)"
          (blur)="listeners('blur', $event)"
        >
        </yue-ui-text>
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
