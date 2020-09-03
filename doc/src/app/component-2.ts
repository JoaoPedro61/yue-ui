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
} from '@JoaoPedro61/yue-ui/table';

import { YueUiHttpService } from '@JoaoPedro61/yue-ui/http';

import { take } from 'rxjs/operators';




@NgComponent({
  template: `
    <yue-ui-table [yueUiTableSource]="tableSource"></yue-ui-table>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component2 {

  public tableSource: TableSource = new TableSource<any>();

  constructor(private readonly http: YueUiHttpService) {
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
      .onTriggerAction(console.log);

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
