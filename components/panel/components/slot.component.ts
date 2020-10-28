import { Component, ChangeDetectionStrategy, Input, HostBinding, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-panel-slot`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-panel-slot]': 'true',
    '[class.yue-ui-panel-slot-fill]': `yueUiPanelSlotFill`,
  },
  exportAs: `yueUiPanelSlotRef`,
})
export class YueUiPanelSlotComponent {

  @Input()
  public yueUiPanelSlotWidth: number | string | null = null;

  @Input()
  public yueUiPanelSlotHeight: number | string | null = null;

  @Input()
  public yueUiPanelSlotFill = false;

  @HostBinding(`style.width`)
  public get width(): string | null {
    return `${this.yueUiPanelSlotWidth && !this.yueUiPanelSlotFill
      ? `${this.yueUiPanelSlotWidth}${typeof this.yueUiPanelSlotWidth === `string` ? `%` : `px`}`
      : this.yueUiPanelSlotFill
        ? `100%`
        : ``}` || null;
  }

  @HostBinding(`style.height`)
  public get height(): string | null {
    return `${this.yueUiPanelSlotHeight && !this.yueUiPanelSlotFill
        ? `${this.yueUiPanelSlotHeight}${typeof this.yueUiPanelSlotHeight === `string` ? `%` : `px`}`
        : this.yueUiPanelSlotFill
          ? `100%`
          : ``}` || null;
  }

}
