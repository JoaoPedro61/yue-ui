import { Component } from '@angular/core';



@Component({
  selector: '[yueUiCollapsePanelHeader], yue-ui-collapse-panel-header',
  template: `<ng-content></ng-content>`,
  styles: [
    `
    :host {
      display: block;
      position: relative;
    }
    `
  ],
  host: {
    '[class.yue-ui-collapse-panel-header]': 'true'
  }
})
export class YueUiCollpaseHeaderComponent {

}