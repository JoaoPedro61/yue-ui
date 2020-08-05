import { Component, ChangeDetectionStrategy } from '@angular/core';



@Component({
  selector: `yue-ui-panel-slot`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-panel-slot]': 'true',
  },
  exportAs: `yueUiPanelSlotRef`,
  styleUrls: [
    `./../styles/slot.component.less`,
  ],
})
export class YueUiPanelSlotComponent {
}

