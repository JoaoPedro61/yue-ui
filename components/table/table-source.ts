// tslint:disable max-line-length
import { BehaviorSubject } from 'rxjs';
import { TableDataColumnItem, TableDataRowItem, YueUiTableColumns, YueUiTableColumn } from './utils/interfaces';



export class TableSource<B = any> {

  private dataColumns$: BehaviorSubject<TableDataColumnItem<B>[]> = new BehaviorSubject<TableDataColumnItem<B>[]>([] as unknown as TableDataColumnItem<B>[]);

  private data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([] as unknown as any[]);

  private renderedData$: BehaviorSubject<(TableDataRowItem<B>[])[]> = new BehaviorSubject<(TableDataRowItem<B>[])[]>([] as unknown as (TableDataRowItem<B>[])[]);

  private _showHeader = true;

  private _allowIndeterminateSorting = true;

  private _columnOrderingBy: any = null;

  private _columnSortingBy: any = null;

  public get isAllowedIndeterminateSorting(): boolean {
    return this._allowIndeterminateSorting;
  }

  public get isShowingHeader(): boolean {
    return this._showHeader;
  }

  public get hasColumns(): boolean {
    const v = this.dataColumns$.getValue();
    return !!(v && v.length);
  }

  public get hasRows(): boolean {
    const v = this.dataColumns$.getValue();
    return !!(v && v.length);
  }

  private prerender(items: B[]): void {
    const header = this.dataColumns$.getValue() || [];
    const newsMulti: any = [];
    const current = this.data$.getValue() || [];
    for (let j = 0, u = items.length; j < u; j++) {
      if (items[j]) {
        const row = [];
        for (let i = 0, l = header.length; i < l; i++) {
          if (header[i]) {
            const item: TableDataRowItem<B> = {
              old: items[j] && current[j] ? current[j].new : null,
              new: items[j],
              identifier: `${header[i].identifier}`,
              value: header[i].identifier
                ? (items[j] as any).hasOwnProperty(header[i].identifier)
                  ? (items[j] as any)[header[i].identifier as any] as any
                  : null
                : null,
              cell: header[i].cellColumn,
              header: header[i],
              full: items[i],
            };
            row.push(item);
          }
        }
        newsMulti.push(row);
      }
    }
    this.data$.next(items);
    this.renderedData$.next(newsMulti);
  }

  private preDefColumn<T = any>(column: YueUiTableColumn<T>): TableDataColumnItem<T> {
    const def: Partial<TableDataColumnItem<T>> = {
      ...column,
      order: this._columnOrderingBy === column.identifier,
      sorting: this._columnOrderingBy === column.identifier ? this._columnSortingBy : null,
    };
    return def as any;
  }

  public setSortAndOrder(identifier: string, sorting: TableDataColumnItem['sorting']): this {
    const columns = this.dataColumns$.getValue() || [];
    for (let i = 0, l = columns.length; i < l; i++) {
      if (columns[i].identifier === identifier) {
        columns[i].order = true;
        columns[i].sorting = sorting;
      } else {
        columns[i].order = false;
        columns[i].sorting = null;
      }
    }
    this._columnOrderingBy = identifier;
    this._columnSortingBy = sorting;
    this.dataColumns$.next(columns);
    return this;
  }

  public columns(columns: YueUiTableColumns): this {
    const columnsDef: TableDataColumnItem[] = [];
    for (let i = 0, l = columns.length; i < l; i++) {
      columnsDef.push(this.preDefColumn(columns[i]));
    }
    this.dataColumns$.next(columnsDef);
    this.rerender();
    return this;
  }

  public connectStreamDataHeader(): BehaviorSubject<TableDataColumnItem<B>[]> {
    return this.dataColumns$;
  }

  public disconnectStreamDataHeader(): this {
    return this;
  }

  public connectRenderedStreamData(): BehaviorSubject<(TableDataRowItem<B>[])[]> {
    return this.renderedData$;
  }

  public disconnectRenderedStreamData(): this {
    return this;
  }

  public connectStreamData(): BehaviorSubject<any[]> {
    return this.data$;
  }

  public disconnectStreamData(): this {
    return this;
  }

  public render(source: B[]): this {
    this.prerender(source);
    return this;
  }

  public rerender(): this {
    const values = this.data$.getValue() || [];
    const old: any = [];
    for (let i = 0, l = values.length; i < l; i++) {
      if (values[i]) {
        old.push(values[i]);
      }
    }
    this.render(old);
    return this;
  }

  public destroy(): void {
    this.data$.complete();
    this.dataColumns$.complete();
    this.renderedData$.complete();
  }

}
