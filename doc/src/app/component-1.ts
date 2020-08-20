import { take } from 'rxjs/operators';
import { Component as NgComponent, ChangeDetectionStrategy,  } from '@angular/core';
import { YueUiBreadcrumbItem } from '@JoaoPedro61/yue-ui/breadcrumb';
import { YueUiModalService } from '@JoaoPedro61/yue-ui/modal';

import { Component3 as Modal1 } from './component-3';



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
          <yue-ui-image style="width: 32px;height: 32px;border-radius: 50%;border: 3px solid rgba(0, 0, 0, .3);" yueUiImageSrc="https://picsum.photos/id/1/200/300"></yue-ui-image>
        </yue-ui-navigation-menu-bottom>
      </yue-ui-navigation-menu>
      <yue-ui-panel>
        <yue-ui-panel-content>
          <yue-ui-panel-slot>
            <div [style.paddingRight.px]="40">
              <yue-ui-panel-present [yueUiPanelPresentBreadcrumbs]="bread">
                <button yueUiButton (click)="open();">
                  New
                </button>
              </yue-ui-panel-present>
              <router-outlet></router-outlet>
            </div>
          </yue-ui-panel-slot>
        </yue-ui-panel-content>
      </yue-ui-panel>
    </yue-ui-layout>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component1 {

  public bread: YueUiBreadcrumbItem[] = [
    {
      label: `João Pedro`,
      url: `child`,
    },
    {
      label: `Administration`,
    },
    {
      label: `Users`,
    },
  ];

  constructor(private readonly modal: YueUiModalService) { }

  public open(): void {
    const ref = this.modal.create({
      header: 'Insert a new register',
      content: Modal1,
      maskClosable: false,
    });
    ref
      .afterClose
      .pipe(take(1))
      .subscribe({
        next: console.log,
      })
  }

}

