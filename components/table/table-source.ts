// tslint:disable max-line-length
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import {
  TableDataColumnItem,
  TableDataRowItem,
  YueUiTableColumns,
  YueUiTableColumn,
  TableGeneratedColumnMetadataFn,
  TableGeneratedActionMetadataFn,
  YueUiTableActions,
  YueUiTableAction,
} from './utils/interfaces';
import { takeUntil } from 'rxjs/operators';



export class TableSource<B = any> {

  private destroy$: Subject<void> = new Subject();

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private dataColumns$: BehaviorSubject<TableDataColumnItem<B>[]> = new BehaviorSubject<TableDataColumnItem<B>[]>([] as unknown as TableDataColumnItem<B>[]);

  private data$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([] as unknown as any[]);

  private renderedData$: BehaviorSubject<(TableDataRowItem<B>[])[]> = new BehaviorSubject<(TableDataRowItem<B>[])[]>([] as unknown as (TableDataRowItem<B>[])[]);

  private actions$: BehaviorSubject<YueUiTableActions> = new BehaviorSubject<YueUiTableActions>([]);

  private onTriggerAction$: Subject<{action: YueUiTableAction; data: Partial<B>}> = new Subject();

  private onQueriesChange$: Subject<Partial<any>> = new Subject();

  private _showHeader = true;

  private _allowIndeterminateSorting = true;

  private _columnOrderingBy: any = null;

  private _columnSortingBy: any = null;

  private _itensTotal = 0;

  private _usePagination = false;

  private _currentPage = 1;

  private _pageSize = 20;

  private _showPageSizeChanger = true;

  private _showTotalLabel = false;

  public lastOnPaginateSubscription$!: Subscription;

  public lastOnActionSubscription$!: Subscription;

  public get page(): number {
    return this._currentPage;
  }

  public get pageSize(): number {
    return this._pageSize;
  }

  public get isAllowedShowPageSizeChanger(): boolean {
    return this._showPageSizeChanger;
  }

  public get isAllowedShowTotalLabelOnPagination(): boolean {
    return this._showTotalLabel;
  }

  public get isAllowedUsePagination(): boolean {
    return this._usePagination;
  }

  public get fullTotalOfItens(): number {
    return this._itensTotal || (this.data$.getValue() || []).length;
  }

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
              full: items[j],
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
      width: typeof column.width === `number` ? `${column.width}px` : column.width
    };
    return def as any;
  }

  public setShowHeader(value: boolean = true): this {
    this._showHeader = value;
    return this;
  }

  public setFullTotalOfItens(value: number): this {
    this._itensTotal = value;
    return this;
  }

  public setShowTotalLabelOfPagination(value: boolean = true): this {
    this._showTotalLabel = value;
    return this;
  }

  public setPageSize(value: number = 20): this {
    this._pageSize = value;
    return this;
  }

  public setPage(value: number = 1): this {
    this._currentPage = value;
    return this;
  }

  public setUsePagination(value: boolean = true): this {
    this._usePagination = value;
    return this;
  }

  public setPaginationSizeChanger(value: boolean = true): this {
    this._showPageSizeChanger = value;
    return this;
  }

  public configurePagination(show: boolean = true, fullTotal: number = (this.data$.getValue() || []).length, page: number = 1, pageSize: number = 20, pageSizeChanger: boolean = true, showTotalLabel: boolean = true): this {
    this.setUsePagination(show);
    this.setFullTotalOfItens(fullTotal);
    this.setPage(page);
    this.setPageSize(pageSize);
    this.setPaginationSizeChanger(pageSizeChanger);
    this.setShowTotalLabelOfPagination(showTotalLabel);
    return this;
  }

  public setPageAndPageSize(page: number = this.page, pageSize: number = this.pageSize): this {
    this._currentPage = page;
    this._pageSize = pageSize;
    return this;
  }

  public updatePageAndPageSize(page: number = this.page, pageSize: number = this.pageSize): this {
    this.setPageAndPageSize(page, pageSize);
    this.emitQueries();
    return this;
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

  public updateSortAndOrder(identifier: string, sorting: TableDataColumnItem['sorting']): this {
    this.setSortAndOrder(identifier, sorting);
    this.emitQueries();
    return this;
  }

  public setLoading(isLoading: boolean = true): this {
    this.loading$.next(isLoading);
    return this;
  }

  public columns(...modifiers: (TableGeneratedColumnMetadataFn<B> | TableGeneratedColumnMetadataFn<B>[])[]): this {

    const columns: YueUiTableColumns = [];

    let _modifiers: TableGeneratedColumnMetadataFn[] = [];

    for (let i = 0, l = modifiers.length; i < l; i++) {
      _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
    }

    for (const _modifier of _modifiers) {
      if (`function` === typeof _modifier) {
        const returns = _modifier();
        if (returns) {
          if (`object` === typeof returns) {
            columns.push(returns);
          }
        }
      }
    }

    const columnsDef: TableDataColumnItem[] = [];
    for (let i = 0, l = columns.length; i < l; i++) {
      columnsDef.push(this.preDefColumn(columns[i]));
    }
    this.dataColumns$.next(columnsDef);
    this.rerender();

    return this;
  }

  public actions(...modifiers: (TableGeneratedActionMetadataFn | TableGeneratedActionMetadataFn[])[]): this {

    const actions: YueUiTableActions = [];

    let _modifiers: TableGeneratedActionMetadataFn[] = [];

    for (let i = 0, l = modifiers.length; i < l; i++) {
      _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
    }

    for (const _modifier of _modifiers) {
      if (`function` === typeof _modifier) {
        const returns = _modifier();
        if (returns) {
          if (`object` === typeof returns) {
            actions.push(returns);
          }
        }
      }
    }

    this.actions$.next(actions);

    return this;
  }

  public emitAction(action: YueUiTableAction, data: Partial<B>): this {
    this.onTriggerAction$.next({action, data});
    return this;
  }

  public emitQueries(): this {
    this.onQueriesChange$.next({
      sort: this._columnSortingBy,
      page: this._currentPage,
      pageSize: this._pageSize,
      order: this._columnOrderingBy,
      offset: (this._currentPage - 1) * this._pageSize,
      limit: this._pageSize,
    });
    return this;
  }

  public connectStreamLoading(): BehaviorSubject<boolean> {
    return this.loading$;
  }

  public connectStreamDestroy(): Subject<void> {
    return this.destroy$;
  }

  public connectStreamActions(): BehaviorSubject<YueUiTableActions> {
    return this.actions$;
  }

  public disconnectStreamActions(): this {
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

  public onPaginate(fn: (values: Partial<any>) => void): this {
    this.lastOnPaginateSubscription$ = this.onQueriesChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: fn,
      });
    return this;
  }

  public onTriggerAction(fn: (values: {action: YueUiTableAction; data: Partial<B>}) => void): this {
    this.lastOnActionSubscription$ = this.onTriggerAction$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: fn,
      });
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
    this.loading$.next(false);
    this.loading$.complete();
    this.destroy$.next();
    this.destroy$.complete();
    this.data$.complete();
    this.dataColumns$.complete();
    this.renderedData$.complete();
    this.actions$.complete();
    this.onTriggerAction$.complete();
    this.onQueriesChange$.complete();
  }

}
