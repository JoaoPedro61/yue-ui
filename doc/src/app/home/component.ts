import { Component as NgComponent, ChangeDetectionStrategy } from '@angular/core';



@NgComponent({
  template: `
    <yue-ui-layout>
      <yue-ui-navigation-menu #navref="navMenuRef" [yueUiNavigationMenuOpened]="true">
        <yue-ui-navigation-menu-sider>
          Caralho
          <button yueUiButton>
            Hello
          </button>
          <a yueUiButton>
            Hello
          </a>
          <yue-ui-button>
            Hello
          </yue-ui-button>
        </yue-ui-navigation-menu-sider>
        <yue-ui-navigation-menu-top>
          TOP
        </yue-ui-navigation-menu-top>
        <yue-ui-navigation-menu-bottom>
         BOT
        </yue-ui-navigation-menu-bottom>
      </yue-ui-navigation-menu>
      <div>
        <div style="margin-top: 100px">
          <span [yueUiTooltip]="title" yueUiTooltipTrigger="hover" yueUiPopover yueUiPopoverPlacement="rightTop" [yueUiPopoverContent]="contentPop">
            <ng-template #title>
              Tooltip Title
            </ng-template>
            <ng-template #titlePop>
              Popover Title
            </ng-template>
            <ng-template #contentPop>
              Popover Content
            </ng-template>
            Tooltip
          </span>
        </div>
      </div>
    </yue-ui-layout>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component { }
