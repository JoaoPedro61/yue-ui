import { Component, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: '[yueUiCollapsePanelHeader], yue-ui-collapse-panel-header',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host,
      .yue-ui-collapse-panel-header {
        display: block;
        position: relative;
      }
    `
  ],
  host: {
    '[class.yue-ui-collapse-panel-header]': 'true'
  }
})
export class YueUiCollpaseHeaderComponent { }
