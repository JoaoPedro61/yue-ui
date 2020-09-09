import { Component as NgComponent, ChangeDetectionStrategy } from '@angular/core';


import {
  TableSource,
  tableColumn,
  tableColumnAllowSort,
  tableColumnIdentifier,
  tableColumnLabel,
  tableColumnType,
  tableColumnWidth,
  tableColumnAdditionalParameters,
  tableAction,
  tableActionLabel,
  tableActionIdentifier,
  tableActionIcon,
  tableActionCondition,
} from '@joaopedro61/yue-ui/table';

import { YueUiHttpService } from '@joaopedro61/yue-ui/http';

import { take } from 'rxjs/operators';
import { YueUiModalService } from '@joaopedro61/yue-ui/modal';
import { YueUiI18nService } from '@joaopedro61/yue-ui/i18n';
import { YueUiBreadcrumbItem } from '@joaopedro61/yue-ui/breadcrumb';




@NgComponent({
  template: `
  <yue-ui-panel>
    <yue-ui-panel-content style="overflow-y: auto;">
      <yue-ui-panel-slot [yueUiPanelSlotFill]="true">
        <div [style.paddingRight.px]="40" [style.paddingBottom.px]="40" [style.height.%]="100">
          <yue-ui-panel>
            <yue-ui-panel-header>
              <yue-ui-panel-present [yueUiPanelPresentBreadcrumbs]="breadcrumbs"></yue-ui-panel-present>
            </yue-ui-panel-header>
            <yue-ui-panel-content>
              <yue-ui-panel-slot [yueUiPanelSlotWidth]="240" yueUiPanelSlotHeight="100" [style.background]="'purple'">
                <yue-ui-menu>
                  <yue-ui-menu-item [yueUiMenuItemSelected]="true">
                    <a [routerLink]="['.']">
                      <i yueUiIcon yueUiIconType="yue-ui-gg-menu"></i>
                      Menu item 1
                    </a>
                  </yue-ui-menu-item>
                  <yue-ui-menu-item>
                    <i yueUiIcon yueUiIconType="yue-ui-gg-menu"></i>
                    Menu item 1
                  </yue-ui-menu-item>
                  <yue-ui-menu-divider>
                    <i yueUiIcon yueUiIconType="yue-ui-gg-menu"></i>
                    Other settings
                  </yue-ui-menu-divider>
                </yue-ui-menu>
              </yue-ui-panel-slot>
              <yue-ui-panel-slot yueUiPanelSlotHeight="100" [style.background]="'red'">
                <yue-ui-table [yueUiTableSource]="tableSource"></yue-ui-table>
              </yue-ui-panel-slot>
            </yue-ui-panel-content>
          </yue-ui-panel>
        </div>
      </yue-ui-panel-slot>
    </yue-ui-panel-content>
  </yue-ui-panel>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component2 {


  private _breadcrumbs = [
    {
      label: `Home`,
    },
    {
      label: `CRM`,
    },
    {
      label: `Clients`,
    },
  ];

  public get breadcrumbs(): YueUiBreadcrumbItem[] {
    return this._breadcrumbs;
  }


  public tableSource: TableSource = new TableSource<any>();

  constructor(private readonly http: YueUiHttpService, private readonly modal: YueUiModalService, private readonly i18n: YueUiI18nService) {
    this.tableSource
      .setSortAndOrder(`id`, `asc`)
      .configurePagination()
      .actions([
        tableAction([
          tableActionLabel(`Deletar`),
          tableActionIdentifier(`delt`),
          tableActionIcon(`yue-ui-gg-trash-empty`),
        ]),
        tableAction([
          tableActionLabel(`Editar`),
          tableActionIdentifier(`edit`),
          tableActionIcon(`yue-ui-gg-pen`),
          tableActionCondition((data) => data.id !== 1)
        ])
      ])
      .columns([
        tableColumn([
          tableColumnAllowSort(),
          tableColumnIdentifier(`id`),
          tableColumnLabel(`#`),
          tableColumnType(`link`),
          tableColumnAdditionalParameters({
            link: `./../`,
          }),
          tableColumnWidth(`30px`)
        ]),
        tableColumn([
          tableColumnAllowSort(),
          tableColumnIdentifier(`name`),
          tableColumnLabel(`Name`),
        ]),
        tableColumn([
          tableColumnAllowSort(),
          tableColumnIdentifier(`username`),
          tableColumnLabel(`Username`),
        ]),
        tableColumn([
          tableColumnAllowSort(),
          tableColumnIdentifier(`email`),
          tableColumnLabel(`E-mail`),
        ]),
      ])
      .onPaginate(() => this.loadFromReq())
      .onTriggerAction(() => {
        this.modal.confirm({
          header: this.i18n.translateAsync(`deleteClientTitle`, { default: `Delete client` }).pipe(take(1)),
          content: this.i18n.translateAsync(`deleteClientContent`, { default: `Are you sure you want to delete the client?` }).pipe(take(1)),
          onButtonOk: () => {
            console.log(`Delete essa bagaca`);
          }
        }, `warning`);
      });

    this.loadFromReq();
  }

  private loadFromReq(): void {
    this.http
      .get(`https://jsonplaceholder.typicode.com/users`)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.tableSource.render(response);
        }
      });
  }

}
