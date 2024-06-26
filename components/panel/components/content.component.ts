import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Optional, Host, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { YueUiPanelComponent } from './panel.component';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-panel-content`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-panel-content]': 'true',
    '[style.height.px]': 'height',
    '[style.flex-wrap]': `yueUiPanelContentWrap ? 'wrap' : 'nowrap'`,
  },
  exportAs: `yueUiPanelContentRef`,
})
export class YueUiPanelContentComponent implements OnInit, OnDestroy {

  public height: number | null = null;

  @Input()
  public yueUiPanelContentWrap = false;

  constructor(public readonly cdr: ChangeDetectorRef, @Optional() @Host() private readonly panel?: YueUiPanelComponent) { }

  public ngOnInit(): void {
    if (this.panel) {
      this.panel.setPanelContent(this);
    }
  }

  public ngOnDestroy(): void {
    if (this.panel) {
      this.panel.setPanelContent(null);
    }
  }

  public setHeight(height: number): void {
    this.height = height;
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

}

