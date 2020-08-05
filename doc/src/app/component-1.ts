import { Component as NgComponent, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { YueUiBreadcrumbComponent } from '@JoaoPedro61/yue-ui/breadcrumb';
import { YueUiBreadcrumbItem } from '@JoaoPedro61/yue-ui/breadcrumb/utils/interfaces';



@NgComponent({
  template: `
    <yue-ui-layout>
      <yue-ui-navigation-menu #navref="navMenuRef" [yueUiNavigationMenuOpened]="true">
        <yue-ui-navigation-menu-sider>
          <yue-ui-menu [yueUiMenuInlineCollapsed]="false" (yueUiMenuSomeChildIsOpened)="navref.setBreakClose($event);">
            <yue-ui-menu-item [yueUiMenuItemSelected]="true">
              Menu item 1
            </yue-ui-menu-item>
            <yue-ui-menu-item [yueUiMenuItemDisabled]="true">
              Menu item 2
            </yue-ui-menu-item>
            <yue-ui-submenu>
              Sub menu
              <yue-ui-menu>
                <yue-ui-menu-item>
                  Sub menu item 1
                </yue-ui-menu-item>
                <yue-ui-menu-item>
                  Sub menu item 2
                </yue-ui-menu-item>
                <yue-ui-menu-item [yueUiMenuItemDisabled]="true">
                  Sub menu item 3
                </yue-ui-menu-item>
                <yue-ui-submenu>
                  Sub menu 1
                  <yue-ui-menu>
                    <yue-ui-menu-item>
                      Sub menu 1 item 1
                    </yue-ui-menu-item>
                    <yue-ui-menu-item>
                      Sub menu 1 item 2
                    </yue-ui-menu-item>
                    <yue-ui-menu-item [yueUiMenuItemDisabled]="true">
                      Sub menu 1 item 3
                    </yue-ui-menu-item>
                  </yue-ui-menu>
                </yue-ui-submenu>
              </yue-ui-menu>
            </yue-ui-submenu>
          </yue-ui-menu>
        </yue-ui-navigation-menu-sider>
        <yue-ui-navigation-menu-top>
          TOP
        </yue-ui-navigation-menu-top>
        <yue-ui-navigation-menu-bottom>
          <yue-ui-image style="width: 40px;height: 40px;border-radius: 50%;border: 3px solid rgba(0, 0, 0, .3);" yueUiImageSrc="https://picsum.photos/id/1/200/300"></yue-ui-image>
        </yue-ui-navigation-menu-bottom>
      </yue-ui-navigation-menu>
      <div>
        <yue-ui-breadcrumb [yueUiBreadcrumbItems]="bread"></yue-ui-breadcrumb>
      </div>
      <div>
        <router-outlet></router-outlet>
      </div>
    </yue-ui-layout>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component1 {

  public bread: YueUiBreadcrumbItem[] = [
    {
      label: `Home`,
    },
    {
      label: `Child`,
      url: `child`
    }
  ];

}

