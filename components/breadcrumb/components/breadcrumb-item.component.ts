import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-breadcrumb-item`,
  template: `
    <ng-content></ng-content>
    <span class="breadcrumb-separator">/</span>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.yue-ui-breadcrumb-item]': 'true'
  },
  exportAs: `yueUiBreadcrumbItemRef`,
  styleUrls: [
    `./../styles/breadcrumb-item.component.less`
  ],
})
export class YueUiBreadcrumbItemComponent { }

