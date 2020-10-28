import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';

import { YueUiBreadcrumbItem } from '@joaopedro61/yue-ui/breadcrumb';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-panel-present`,
  template: `
    <div class="yue-ui-panel-present-wrapper">
      <div class="yue-ui-panel-present-breadcrumbs">
        <yue-ui-breadcrumb [yueUiBreadcrumbItems]="unactivatedSegments"></yue-ui-breadcrumb>
      </div>
      <div class="yue-ui-panel-present-activated">
        <div class="yue-ui-panel-present-activated-wrapper">
          <div class="yue-ui-panel-present-activated-segment-wrapper">
            <div  class="yue-ui-panel-present-activated-segment-wrapper-inner">
              <ng-container *ngIf="hasActivatedSegment">
                <ng-container *ngIf="ngSafeValue_activatedsegment.url; else nourl">
                  <a [routerLink]="[ngSafeValue_activatedsegment.url]">
                    <yue-ui-smart-render [yueUiSmartRender]="ngSafeValue_activatedsegment.label"></yue-ui-smart-render>
                  </a>
                </ng-container>
                <ng-template #nourl>
                  <yue-ui-smart-render [yueUiSmartRender]="ngSafeValue_activatedsegment.label"></yue-ui-smart-render>
                </ng-template>
              </ng-container>
            </div>
          </div>
          <div class="yue-ui-panel-present-activated-append-wrapper">
            <div class="yue-ui-panel-present-activated-append-wrapper-inner">
              <ng-content></ng-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-panel-present]': 'true',
    '[class.yue-ui-panel-present-has-breadcrumbs]': 'yueUiPanelPresentBreadcrumbs.length',
  },
  exportAs: `yueUiPanelPresentRef`,
})
export class YueUiPanelPresentComponent {

  @Input()
  public yueUiPanelPresentBreadcrumbs: YueUiBreadcrumbItem[] = [];

  public get unactivatedSegments(): YueUiBreadcrumbItem[] {
    if (this.yueUiPanelPresentBreadcrumbs.length > 1) {
      return this.yueUiPanelPresentBreadcrumbs.slice(0, -1);
    }
    return [];
  }

  public get hasActivatedSegment(): boolean {
    return !!this.yueUiPanelPresentBreadcrumbs.length;
  }

  public get ngSafeValue_activatedsegment(): YueUiBreadcrumbItem {
    return this.yueUiPanelPresentBreadcrumbs[this.yueUiPanelPresentBreadcrumbs.length - 1] as YueUiBreadcrumbItem;
  }

}
