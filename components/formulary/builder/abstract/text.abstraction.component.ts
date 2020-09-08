import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FieldAbstraction } from './abstraction';



@Component({
  template: `
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'password'">
        <yue-ui-password
          [formControl]="abstractControl"
          [yueUiPasswordPlaceholder]="placeholder"
          [yueUiPasswordMask]="mask"
        >
        </yue-ui-password>
      </ng-container>
      <ng-container *ngSwitchCase="'textarea'">
        <yue-ui-textarea
          [formControl]="abstractControl"
          [yueUiTextareaPlaceholder]="placeholder"
          [yueUiTextareaMask]="mask"
        ></yue-ui-textarea>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <yue-ui-text
          [formControl]="abstractControl"
          [yueUiTextPlaceholder]="placeholder"
          [yueUiTextMask]="mask"
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
export class TextAbstractionComponent extends FieldAbstraction {

  public get mode(): string {
    if (this.field) {
      return this.field.mode as string;
    }
    return `text`;
  }

  constructor() {
    super();
  }

}
