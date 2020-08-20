import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FieldAbstraction } from './abstraction';



@Component({
  template: `
    <yue-ui-text
      [formControl]="abstractControl"
      [yueUiTextPlaceholder]="placeholder"
      [yueUiTextMask]="mask"
    >
    </yue-ui-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.text-abstraction]': 'true'
  },
  exportAs: 'textAbstractionRef',
})
export class TextAbstractionComponent extends FieldAbstraction {

  constructor() {
    super();
  }

}
