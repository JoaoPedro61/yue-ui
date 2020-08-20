import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FieldAbstraction } from './abstraction';



@Component({
  template: `
    <yue-ui-select [formControl]="abstractControl">
      <yue-ui-select-option></yue-ui-select-option>
    </yue-ui-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.select-abstraction]': 'true'
  },
  exportAs: 'selectAbstractionRef',
})
export class SelectAbstractionComponent extends FieldAbstraction {

  constructor() {
    super();
  }

}
