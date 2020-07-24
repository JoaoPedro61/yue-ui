import { Component } from '@angular/core';

import { FieldAbstraction } from './abstraction';



@Component({
  template: `<yue-ui-switch [formControl]="abstractControl"></yue-ui-switch> {{abstractControl.value}}`,
  styleUrls: [
    `./../styles/noop.component.less`
  ]
})
export class SwitchAbstractionComponent extends FieldAbstraction {

  constructor() {
    super();

    setTimeout(() => {
      this.abstractControl.setValue(true);
    }, 5000)
  }

}
