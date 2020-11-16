import { take } from 'rxjs/operators';
import { Component as NgComponent, ChangeDetectionStrategy, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { YueUiBreadcrumbItem } from '@joaopedro61/yue-ui/breadcrumb';
import { YueUiModalService } from '@joaopedro61/yue-ui/modal';
import { YueUiNotificationService } from '@joaopedro61/yue-ui/notification';
import { YueUiThematizationService } from '@joaopedro61/yue-ui/thematization';

import { Component3 as Modal1 } from './component-3';


@NgComponent({
  template: `
    <yue-ui-layout>
      <yue-ui-navigation-menu #navref="yueUiNavigationMenuRef" [yueUiNavigationMenuHideStaticBar]="!true" [yueUiNavigationMenuOpened]="true">
        <yue-ui-navigation-menu-sider>
          <yue-ui-menu [yueUiMenuMode]="'vertical'" (yueUiMenuSubmenuSomeOpened)="navref.setBreakClose($event);">
            <yue-ui-menu-item>
              <i [yueUiIcon]="'menu'" [yueUiIconTheme]="'outline'"></i>
              Hello
            </yue-ui-menu-item>
            <yue-ui-menu-item>
              Hello 1
            </yue-ui-menu-item>
            <yue-ui-menu-item>
              Hello 2
            </yue-ui-menu-item>
            <yue-ui-menu-divider></yue-ui-menu-divider>
            <a yueUiMenuItem [routerLink]="['/child']">
              Child
            </a>
            <yue-ui-menu-group [yueUiMenuGroupLabel]="'Merda'">
              <yue-ui-menu-item>
                Hello 2
              </yue-ui-menu-item>
              <a yueUiMenuItem [routerLink]="['.']">
                Link
              </a>
              <yue-ui-menu-submenu [yueUiMenuSubmenuLabel]="'SubMenu'">
                <yue-ui-menu-item>
                  Hello 3
                </yue-ui-menu-item>
                <a yueUiMenuItem [routerLink]="['.']" [yueUiMenuItemMatchRouter]="true">
                  Link 3
                </a>
                <yue-ui-menu-group [yueUiMenuGroupLabel]="'Others'">
                  <yue-ui-menu-item>
                    Hello 2
                  </yue-ui-menu-item>
                  <a yueUiMenuItem [routerLink]="['.']">
                    Link
                  </a>
                  <yue-ui-menu-submenu [yueUiMenuSubmenuLabel]="'SubMenu'">
                    <yue-ui-menu-item>
                      Hello 3
                    </yue-ui-menu-item>
                    <a yueUiMenuItem [routerLink]="['.']" [yueUiMenuItemMatchRouter]="true">
                      Link 3
                    </a>
                  </yue-ui-menu-submenu>
                </yue-ui-menu-group>
              </yue-ui-menu-submenu>
            </yue-ui-menu-group>
          </yue-ui-menu>
        </yue-ui-navigation-menu-sider>
      </yue-ui-navigation-menu>
      <!-- <div style="margin-top: 5px;margin-bottom: 20px;width: 200px;">
        <div style="margin-top: 10px;">
          <yue-ui-formulary-switch [(ngModel)]="value" [yueUiFormularySwitchMode]="'indeterminate-checkbox'" [yueUiFormularySwitchDisable]="true"></yue-ui-formulary-switch>
        </div>
        <div style="margin-top: 10px;">
          <yue-ui-formulary-switch [(ngModel)]="value" [yueUiFormularySwitchMode]="'indeterminate-button'" [yueUiFormularySwitchDisable]="true"></yue-ui-formulary-switch>
        </div>
      </div>
      <div style="margin-top: 10px;margin-bottom: 20px;">
        <yue-ui-menu [yueUiMenuMode]="'horizontal'">
          <yue-ui-menu-item>
            <i [yueUiIcon]="'menu'" [yueUiIconTheme]="'outline'"></i>
            Hello
          </yue-ui-menu-item>
          <yue-ui-menu-item [yueUiMenuItemDisabled]="true">
            Hello 1
          </yue-ui-menu-item>
          <yue-ui-menu-item (click)="open();">
            Hello 2
          </yue-ui-menu-item>
          <yue-ui-menu-divider></yue-ui-menu-divider>
          <a yueUiMenuItem [routerLink]="['.']">
            Link
          </a>
          <yue-ui-menu-submenu [yueUiMenuSubmenuLabel]="'SubMenu'">
            <yue-ui-menu-item>
              Hello 3
            </yue-ui-menu-item>
            <a yueUiMenuItem [routerLink]="['.']" [yueUiMenuItemMatchRouter]="true">
              Link 3
            </a>
          </yue-ui-menu-submenu>
        </yue-ui-menu>
      </div> -->
      <router-outlet></router-outlet>
    </yue-ui-layout>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component1 {

  public value = null;

  public ctrl: FormControl = new FormControl(null);

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

  constructor(private readonly modal: YueUiModalService, private readonly notification: YueUiNotificationService, private readonly theme: YueUiThematizationService) { }

  public toggle(val: boolean = false): void {
    if (!val) {
      if (this.ctrl.disabled) {
        this.ctrl.enable();
      } else {
        this.ctrl.disable();
      }
    } else {
      if (this.ctrl.invalid) {
        this.ctrl.clearValidators();
      } else {
        this.ctrl.setValidators([Validators.required]);
      }
      this.ctrl.updateValueAndValidity();
    }
  }

  public noty(): void {
    this.notification.warning('Cuidado', `Osso`);
    this.notification.success('De boa', `Osso`);
    this.notification.info(undefined, `Osso`);
    this.notification.error(undefined, `Osso`);
  }

  public change(): void {
    this.theme.setTheme(this.theme.themeName === 'dark' ? 'light' : 'dark');
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
