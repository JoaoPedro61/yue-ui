import {Component} from '@angular/core';
import {FieldAbstraction} from './abstraction';



@Component({
  template: `<input type="text" [formControl]="abstractControl" />`,
  styleUrls: [
    `./../styles/noop.component.less`
  ]
})
export class NoopComponent extends FieldAbstraction {

  constructor() {
    super();
  }

}
