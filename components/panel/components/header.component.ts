import { Component, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: `yue-ui-panel-header`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-panel-header]': 'true',
  },
  exportAs: `yueUiPanelHeaderRef`,
  styleUrls: [
    `./../styles/header.component.less`,
  ],
})
export class YueUiPanelHeaderComponent {
}

