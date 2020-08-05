import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';



@Component({
  selector: `yue-ui-panel-content`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-panel-content]': 'true',
    '[style.height.px]': 'height'
  },
  exportAs: `yueUiPanelContentRef`,
  styleUrls: [
    `./../styles/content.component.less`
  ]
})
export class YueUiPanelContentComponent {

  public height: number | null = null;

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public setHeight(height: number): void {
    this.height = height;
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

}

