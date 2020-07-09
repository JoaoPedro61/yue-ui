import { Component as NgComponent, ChangeDetectionStrategy } from '@angular/core';



@NgComponent({
  template: `
    <yue-ui-layout>
      <yue-ui-navigation-menu #navref="navMenuRef" [yueUiNavigationMenuOpened]="true">
        <yue-ui-navigation-menu-sider>
          Caralho
        </yue-ui-navigation-menu-sider>
        <yue-ui-navigation-menu-top>
          TOP
        </yue-ui-navigation-menu-top>
        <yue-ui-navigation-menu-bottom>
         BOT
        </yue-ui-navigation-menu-bottom>
      </yue-ui-navigation-menu>
      <div>
        <p #elTrigger>This is your layout content<p>
        <yue-ui-i18n [yueUiI18nToken]="'WELCOME.HOME|default:This is my simple example with piped value'"></yue-ui-i18n>

        <div [yueUiCollapseCdk]="open" [yueUiCollapseCdkTriggerOpenEl]="elTrigger">
          Hello Caralho
          <div style="width: 100px; height: 50px; background: red;"></div>
        </div>

        <div style="margin: 30px 0px; width: 500px;">
      
          <yue-ui-collapse>
            <yue-ui-collapse-panel>
              <div yueUiCollapsePanelHeader>

                Header
              </div>
              Hello
            </yue-ui-collapse-panel>
            <yue-ui-collapse-panel>
              <div yueUiCollapsePanelHeader>

                Header
              </div>
              Hello
            </yue-ui-collapse-panel>
            <yue-ui-collapse-panel>
              <div yueUiCollapsePanelHeader>

                Header
              </div>
              Hello
            </yue-ui-collapse-panel>
            <yue-ui-collapse-panel>
              <div yueUiCollapsePanelHeader>

                Header
              </div>
              Hello
            </yue-ui-collapse-panel>
            <yue-ui-collapse-panel>
              <div yueUiCollapsePanelHeader>
                Header
              </div>
              Hello
            </yue-ui-collapse-panel>
          </yue-ui-collapse>
        </div>

        <div>
          <button
            yueUiButton
            [yueUiButtonLoading]="load"
            [yueUiButtonDisable]="disa"

            yueUiTooltip="Merda"

            yueUiTooltipTitle="asdfjahgsdkjhfg"
          >
            Hello
          </button>
          <yue-ui-button (click)="disa = !disa;">
            Disable
          </yue-ui-button>
          <yue-ui-button (click)="load = !load;">
            load
          </yue-ui-button>
          <yue-ui-button (click)="open = !open;">
            opened
            {{open}}
          </yue-ui-button>
        </div>
      </div>
    </yue-ui-layout>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component {
  
  disa= false;

  load= false;

  open = false;

}
