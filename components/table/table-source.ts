// tslint:disable max-line-length
import { BehaviorSubject } from 'rxjs';
import { TableDataColumnItem, TableDataRowItem } from './utils/interfaces';



export class TableSource<B = any> {

  private dataColumns$: BehaviorSubject<TableDataColumnItem<B>[]> = new BehaviorSubject<TableDataColumnItem<B>[]>([] as unknown as TableDataColumnItem<B>[]);

  private data$: BehaviorSubject<TableDataRowItem<B>[]> = new BehaviorSubject<TableDataRowItem<B>[]>([] as unknown as TableDataRowItem<B>[]);

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
    const news: TableDataRowItem<B>[] = [];
    const current = this.data$.getValue() || [];
    for (let i = 0, l = header.length; i < l; i++) {
      if (header[i]) {
        for (let j = 0, u = items.length; j < u; j++) {
          if (items[j]) {
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
            };
            news.push(item);
          }
        }
      }
    }
    this.data$.next(news);
  }

  public columns(): this {
    return this;
  }

  public connectStreamDataHeader(): BehaviorSubject<TableDataColumnItem<B>[]> {
    return this.dataColumns$;
  }

  public disconnectStreamDataHeader(): this {
    return this;
  }

  public connectStreamData(): BehaviorSubject<TableDataRowItem<B>[]> {
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
      if (values[i].old) {
        old.push(values[i].old);
      }
    }
    this.render(old);
    return this;
  }

  public destroy(): void { }

}
