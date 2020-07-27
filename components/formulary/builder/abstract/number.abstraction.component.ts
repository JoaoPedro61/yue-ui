import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FieldAbstraction } from './abstraction';



@Component({
  template: `
    <yue-ui-number [formControl]="abstractControl"></yue-ui-number>
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
