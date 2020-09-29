import { Component, ChangeDetectionStrategy, Optional, Host, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { YueUiPanelComponent } from './panel.component';




@Component({
  encapsulation: ViewEncapsulation.None,
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
export class YueUiPanelHeaderComponent implements OnInit, OnDestroy {

  constructor(private readonly el: ElementRef<any>, @Optional() @Host() private readonly panel?: YueUiPanelComponent) { }

  public ngOnInit(): void {
    if (this.panel) {
      this.panel.setHeaderEl(this.el);
    }
  }

  public ngOnDestroy(): void {
    if (this.panel) {
      this.panel.setHeaderEl(null);
    }
  }

}

