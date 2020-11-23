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
    <yue-ui-panel-header>
      <yue-ui-panel-present [yueUiPanelPresentBreadcrumbs]="breadcrumbs"></yue-ui-panel-present>
    </yue-ui-panel-header>
    <yue-ui-panel-content>
      <yue-ui-panel-slot yueUiPanelSlotHeight="100" [style.overflow]="'auto'">
        <div yueUiGrid yueUiGridAlign="center">
          <div yueUiGridCol [yueUiGridColMd]="{ span: 23 }">
            <div>
              <button yueUiButton [yueUiButtonType]="'primary'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonType]="'secondary'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonType]="'success'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonType]="'danger'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonType]="'warning'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonType]="'info'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton>
                This is a shit button
              </button>
            </div>
            <div style="margin-top: 5px;margin-bottom: 20px;">
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonType]="'primary'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonType]="'secondary'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonType]="'success'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonType]="'danger'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonType]="'warning'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonType]="'info'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true">
                This is a shit button
              </button>
            </div>
            <div style="margin-top: 5px;">
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonDisable]="true" [yueUiButtonType]="'primary'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonDisable]="true" [yueUiButtonType]="'secondary'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonDisable]="true" [yueUiButtonType]="'success'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonDisable]="true" [yueUiButtonType]="'danger'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonDisable]="true" [yueUiButtonType]="'warning'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonDisable]="true" [yueUiButtonType]="'info'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonGhost]="true" [yueUiButtonDisable]="true">
                This is a shit button
              </button>
            </div>
            <div style="margin-top: 5px;margin-bottom: 20px;">
              <button yueUiButton [yueUiButtonDisable]="true" [yueUiButtonType]="'primary'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonDisable]="true" [yueUiButtonType]="'secondary'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonDisable]="true" [yueUiButtonType]="'success'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonDisable]="true" [yueUiButtonType]="'danger'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonDisable]="true" [yueUiButtonType]="'warning'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonDisable]="true" [yueUiButtonType]="'info'" style="margin-right: 5px;">
                This is a shit button
              </button>
              <button yueUiButton [yueUiButtonDisable]="true">
                This is a shit button
              </button>
            </div>

            <div style="margin: 50px 0px;width: 300px;">
              <yue-ui-card>
                <yue-ui-card-header>This is a shit header</yue-ui-card-header>
                <yue-ui-card-content>This is a shit content</yue-ui-card-content>
                <yue-ui-card-footer>This is a shit footer</yue-ui-card-footer>
                <yue-ui-card-metadata yueUiCardMetadataTitle="Title" yueUiCardMetadataDescription="Description" yueUiCardMetadataAvatar="Avatar"></yue-ui-card-metadata>
                <yue-ui-card-cover>
                  <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                </yue-ui-card-cover>
              </yue-ui-card>
            </div>

            <yue-ui-collapse>
              <yue-ui-collapse-panel [yueUiCollapsePanelOpen]="false">
                <yue-ui-collapse-panel-header>
                  <span [yueUiTooltip]="'Table In Collapse'">
                    Table In Collapse
                  </span>
                </yue-ui-collapse-panel-header>
                <yue-ui-table [yueUiTableSource]="tableSource"></yue-ui-table>
              </yue-ui-collapse-panel>
            </yue-ui-collapse>
          </div>
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
          tableActionIcon(`menu`),
        ]),
        tableAction([
          tableActionLabel(`Editar`),
          tableActionIdentifier(`edit`),
          tableActionIcon(`close`),
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
          tableColumnWidth(`35px`)
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
      .onPaginate(_ => this.loadFromReq())
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

  public noty(): void {
  }

  private loadFromReq(): void {
    this.tableSource.setLoading();
    this.http
      .get(`https://jsonplaceholder.typicode.com/users`)
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
            this.tableSource.setLoading(false);
            this.tableSource.setFullTotalOfItens(400);
            this.tableSource.render(response);
          }
        });
  }

}
