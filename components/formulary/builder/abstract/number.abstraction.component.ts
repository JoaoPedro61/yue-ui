import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FieldAbstraction } from './abstraction';



@Component({
  template: `
    <yue-ui-number
      [formControl]="abstractControl"
      [yueUiNumberPlaceholder]="placeholder"
      (click)="listeners('click', $event)"
      (mousedown)="listeners('mousedown', $event)"
      (mouseup)="listeners('mouseup', $event)"
      (mouseenter)="listeners('mouseenter', $event)"
      (mouseleave)="listeners('mouseleave', $event)"
      (focus)="listeners('focus', $event)"
      (blur)="listeners('blur', $event)"
    ></yue-ui-number>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.number-abstraction]': 'true'
  },
  exportAs: 'numberAbstractionRef',
})
export class NumberAbstractionComponent extends FieldAbstraction {

  constructor() {
    super();
  }

}
