import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu-group`,
  template: `
    <div class="yue-ui-menu-group-label">
      <div class="yue-ui-menu-group-label-inner">
        <ng-container *ngIf="icon">
          <i [yueUiIcon]="icon" [yueUiIconTheme]="'outline'"></i>
        </ng-container>
        <yue-ui-smart-render [yueUiSmartRender]="label"></yue-ui-smart-render>
      </div>
    </div>
    <div class="yue-ui-menu-group-content">
      <ng-content select="[yueUiMenuItemLink], yue-ui-menu-item, yue-ui-menu-submenu, yue-ui-menu-divider, yue-ui-menu-group"></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    [`[class.yue-ui-menu-group]`]: `true`
  },
  preserveWhitespaces: false,
})
export class YueUiMenuGroupComponent {

  @Input(`yueUiMenuGroupLabel`)
  public label: YueUiSmartRenderType;

  @Input(`yueUiMenuGroupIcon`)
  public icon!: string;

}
