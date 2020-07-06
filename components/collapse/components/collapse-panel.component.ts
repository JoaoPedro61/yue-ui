import { Component, Input, Output, EventEmitter, ChangeDetectorRef, Host, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { YueUiCollapseComponent } from './collapse.component';



@Component({
  selector: 'yue-ui-collapse-panel',
  template: `
    <div class="yue-ui-collapse--wrapper">
      <div class="yue-ui-collapse--wrapper-inner">
        <div (click)="dispathEventClick();" class="yue-ui-collapse--header-wrapper">
          <div class="yue-ui-collapse--header-wrapper-inner">
            <div class="yue-ui-collapse--header-wrapper-inner-start-slot">
              <ng-content select="[yueUiCollapsePanelHeader], yue-ui-collapse-panel-header"></ng-content>
            </div>
            <div class="yue-ui-collapse--header-wrapper-inner-end-slot">
              <div class="yue-ui-collapse--header-wrapper-inner-opened-indicator">
                <i yueUiIcon yueUiIconType="yue-ui-gg-chevron-down" [yueUiIconRotate]="open ? 90 : 0"></i>
              </div>
            </div>
          </div>
        </div>
        <div yueUiCollapseCdk [yueUiCollapseCdkOpen]="open" class="cdk-content-collapse--implementation">
          <div class="yue-ui-collapse--content-wrapper">
            <div class="yue-ui-collapse--content-wrapper-inner">
              <ng-content select="*:not(yue-ui-collapse-panel-header):not([yueUiCollapsePanelHeader])"></ng-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: `yueUiCollapsePanelRef`,
  host: {
    '[class.yue-ui-collapse-panel]': 'true',
    '[class.yue-ui-collapse-panel-opened]': 'open',
    '[class.yue-ui-collapse-panel-closed]': '!open',
    '[class.yue-ui-collapse-panel-disabled]': 'disable',
    '[class.yue-ui-collapse-panel-header--no-background]': 'headerWitoutBackground',
    '[class.yue-ui-collapse-panel-content--no-padding]': 'contentWitoutPadding',
  },
  styleUrls: [
    './../styles/collapse-panel.component.less'
  ]
})
export class YueUiCollapsePanelComponent implements OnInit, OnDestroy {
  
  private _open = false;

  @Input('yueUiCollapsePanelOpen')
  public get open(): boolean {
    return this._open;
  }

  public set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;

      this.openChange.emit(value);
    }
  }

  @Input('yueUiCollapsePanelDisable')
  public disable = false;

  @Input('yueUiCollapsePanelNoBackgroundOnHeader')
  public headerWitoutBackground = false;

  @Input('yueUiCollapsePanelNoPaddingOnContent')
  public contentWitoutPadding = false;

  @Output('yueUiCollapsePanelOpenChange')
  public openChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private readonly cdr: ChangeDetectorRef, @Host() private readonly collapse: YueUiCollapseComponent) {}

  public dispathEventClick(): void {
    if (!this.disable) {
      this.collapse.handleAccordion(this);
    }
  }

  public markForCheck(): void {
    this.cdr.markForCheck();
  }

  public ngOnInit(): void {
    this.collapse.addPanel(this);
  }

  public ngOnDestroy(): void {
    this.collapse.removePanel(this);
  }

}
