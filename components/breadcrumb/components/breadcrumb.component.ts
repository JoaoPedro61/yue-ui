import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';

import { YueUiBreadcrumbItem } from './../utils/interfaces';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-breadcrumb`,
  template: `
    <ng-content select="yue-ui-breadcrumb-item"></ng-content>
    <ng-container *ngIf="yueUiBreadcrumbItems && yueUiBreadcrumbItems.length">
      <ng-container *ngFor="let item of yueUiBreadcrumbItems">
        <ng-container *ngIf="item.url; else noUrl">
          <yue-ui-breadcrumb-item>
            <a [routerLink]="[item.url]">
              <yue-ui-smart-render [yueUiSmartRender]="item.label"></yue-ui-smart-render>
            </a>
          </yue-ui-breadcrumb-item>
        </ng-container>
        <ng-template #noUrl>
          <yue-ui-breadcrumb-item>
            <yue-ui-smart-render [yueUiSmartRender]="item.label"></yue-ui-smart-render>
          </yue-ui-breadcrumb-item>
        </ng-template>
      </ng-container>
    </ng-container>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.yue-ui-breadcrumb]': 'true'
  },
  exportAs: `yueUiBreadcrumbRef`,
  styleUrls: [
    `./../styles/breadcrumb.component.less`
  ],
})
export class YueUiBreadcrumbComponent {

  @Input()
  public yueUiBreadcrumbItems: YueUiBreadcrumbItem[] = [];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  public setItems(items: YueUiBreadcrumbItem[]): void {
    this.yueUiBreadcrumbItems = items;
    this.cdr.markForCheck();
  }

}

