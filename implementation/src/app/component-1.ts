import { take } from 'rxjs/operators';
import { Component as NgComponent, ChangeDetectionStrategy, } from '@angular/core';
import { YueUiBreadcrumbItem } from '@joaopedro61/yue-ui/breadcrumb';
import { YueUiModalService } from '@joaopedro61/yue-ui/modal';
import { YueUiNotificationService } from '@joaopedro61/yue-ui/notification';

import { Component3 as Modal1 } from './component-3';



@NgComponent({
  template: `
    <yue-ui-layout>
      <yue-ui-navigation-menu #navref="yueUiNavigationMenuRef" [yueUiNavigationMenuHideStaticBar]="true" [yueUiNavigationMenuOpened]="true">
        <yue-ui-navigation-menu-sider>
          <yue-ui-menu [yueUiMenuInlineCollapsed]="false" (yueUiMenuSomeChildIsOpened)="navref.setBreakClose($event);">
            <yue-ui-menu-item [yueUiMenuItemSelected]="true">
              <a [routerLink]="['child']">
                <i yueUiIcon yueUiIconType="yue-ui-gg-menu"></i>
                Menu item 1
              </a>
            </yue-ui-menu-item>
            <yue-ui-menu-item (click)="open();">
              Modal
            </yue-ui-menu-item>
            <yue-ui-menu-item (click)="noty();">
              Noty
            </yue-ui-menu-item>
            <yue-ui-menu-divider>
              <i yueUiIcon yueUiIconType="yue-ui-gg-menu"></i>
              Other settings
            </yue-ui-menu-divider>
            <yue-ui-submenu>
              Sub menu
              <yue-ui-menu>
                <yue-ui-menu-item>
                  Sub menu item 1
                </yue-ui-menu-item>
                <yue-ui-menu-item>
                  Sub menu item 2
                </yue-ui-menu-item>
                <yue-ui-submenu>
                  Sub menu 1
                  <yue-ui-menu>
                    <yue-ui-menu-item>
                      <i yueUiIcon yueUiIconType="yue-ui-gg-menu"></i>
                      Sub menu 1 item 1
                    </yue-ui-menu-item>
                    <yue-ui-menu-item>
                      Sub menu 1 item 2
                    </yue-ui-menu-item>
                  </yue-ui-menu>
                </yue-ui-submenu>
              </yue-ui-menu>
            </yue-ui-submenu>
          </yue-ui-menu>
        </yue-ui-navigation-menu-sider>
      </yue-ui-navigation-menu>
      <router-outlet></router-outlet>
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

  constructor(private readonly modal: YueUiModalService, private readonly notification: YueUiNotificationService) { }

  public noty(): void {
    this.notification.warning('Cuidado', `Osso`);
    this.notification.success('De boa', `Osso`);
    this.notification.info(undefined, `Osso`);
    this.notification.error(undefined, `Osso`);
  }

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
      });
  }

}

