import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Optional,
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { IsMenuInsideDropDownToken } from '../utils/token';



export function MenuGroupFactory(isMenuInsideDropDownToken: boolean): boolean {
  return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}

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
    <div [class.yue-ui-menu-group-dropdown-list]="isMenuInsideDropDown" [class.yue-ui-menu-group-list]="!isMenuInsideDropDown">
      <ng-content select="[yueUiMenuItem], yue-ui-menu-item, yue-ui-menu-submenu, yue-ui-menu-divider, yue-ui-menu-group"></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IsMenuInsideDropDownToken,
      useFactory: MenuGroupFactory,
      deps: [[new SkipSelf(), new Optional(), IsMenuInsideDropDownToken]]
    }
  ],
  host: {
    [`[class.yue-ui-menu-group]`]: `!isMenuInsideDropDown`,
    [`[class.yue-ui-menu-group-dropdown]`]: `isMenuInsideDropDown`,

  },
  preserveWhitespaces: false,
  exportAs: `yueUiMenuGroupRef`
})
export class YueUiMenuGroupComponent {

  @Input(`yueUiMenuGroupLabel`)
  public label: YueUiSmartRenderType;

  @Input(`yueUiMenuGroupIcon`)
  public icon!: string;

  constructor(@Inject(IsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean) { }

}
