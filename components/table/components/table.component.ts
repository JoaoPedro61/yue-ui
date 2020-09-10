import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, AfterViewInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { TableSource } from './../table-source';
import { TableDataColumnItem, TableDataRowItem, YueUiTableActions } from '../utils/interfaces';




@Component({
  selector: 'yue-ui-table',
  template: `
    <div class="yue-ui-table-wrapper">
      <div class="yue-ui-table-wrapper-inner">
        <ng-container *ngIf="source; else nosource">
          <ng-container *ngIf="hasData; else norows">
            <ng-container *ngIf="!(loading$ | async); else loading">
              <ng-container *ngIf="hasColumns; else nocolumns">
                <table class="yue-ui-table-el">
                  <ng-container *ngIf="showHeader">
                    <thead class="yue-ui-table-header-el">
                      <tr class="yue-ui-table-header-row-el">
                        <ng-container *ngFor="let column of columns$ | async">
                          <th [style.width]="column.width" class="yue-ui-table-header-row-th-el" [class.isSortable]="!!column.allowSort" (click)="handleClickOnColumnHeader(column);">
                            <yue-ui-smart-render
                              [yueUiSmartRender]="column.cellHeader"
                              [yueUiSmartRenderContext]="column"
                            >
                            </yue-ui-smart-render>
                            <ng-container *ngIf="column.allowSort">
                              <div class="sortable-handler-wrapper" [class.asc]="column.sorting === 'asc'" [class.desc]="column.sorting === 'desc'">
                                <div class="sortable-handler">
                                  <div class="up">
                                  </div>
                                  <div class="down">
                                  </div>
                                </div>
                              </div>
                            </ng-container>
                          </th>
                        </ng-container>
                        <ng-container *ngIf="hasActions">
                          <th [style.width.px]="60" class="yue-ui-table-header-row-th-el">
                            <yue-ui-i18n yueUiI18nToken="components.table.actions" [yueUiI18nParameters]="{ default: 'Actions' }"></yue-ui-i18n>
                          </th>
                        </ng-container>
                      </tr>
                    </thead>
                  </ng-container>
                  <tbody class="yue-ui-table-body-el">
                    <ng-container *ngFor="let row of data$ | async">
                      <tr class="yue-ui-table-body-row-el">
                        <ng-container *ngFor="let column of row">
                          <td class="yue-ui-table-body-row-td-el">
                            <ng-container *ngIf="column.cell; else plaint">
                              <yue-ui-smart-render
                                [yueUiSmartRender]="column.cell"
                                [yueUiSmartRenderContext]="column"
                              >
                              </yue-ui-smart-render>
                            </ng-container>
                            <ng-template #plaint>
                              <span [innerText]="column.value"></span>
                            </ng-template>
                          </td>
                        </ng-container>
                        <ng-container *ngIf="hasActions">
                          <td class="yue-ui-table-body-row-td-el">
                            <yue-ui-table-actions-cell
                              [yueUiTableActionsCellActions]="actions$ | async"
                              [yueUiTableActionsCellRow]="row"

                              (yueUiTableActionsCellTriggerAction)="onTriggerAction($event);"
                            ></yue-ui-table-actions-cell>
                          </td>
                        </ng-container>
                      </tr>
                    </ng-container>
                  </tbody>
                </table>
              </ng-container>
              <ng-template #nocolumns>
                <div class="table-error-el">
                  <yue-ui-i18n yueUiI18nToken="components.table.noColumns"></yue-ui-i18n>
                </div>
              </ng-template>
            </ng-container>
            <ng-template #loading>
              <div class="table-error-el">
                <yue-ui-i18n yueUiI18nToken="components.table.loading"></yue-ui-i18n>
              </div>
            </ng-template>
          </ng-container>
          <ng-template #norows>
            <div class="table-error-el">
              <yue-ui-i18n yueUiI18nToken="components.table.noData"></yue-ui-i18n>
            </div>
          </ng-template>
        </ng-container>
        <ng-template #nosource>
          <div class="table-error-el">
            <yue-ui-i18n yueUiI18nToken="components.table.noSource"></yue-ui-i18n>
          </div>
        </ng-template>
      </div>
    </div>
    <ng-container *ngIf="showPagination && source && hasData && hasColumns && !(loading$ | async)">
      <div style="display: flex;justify-content: flex-end;">
        <yue-ui-pagination
          [yueUiPaginationItensCount]="totalOfItens"

          [yueUiPaginationPage]="currentPage"
          [yueUiPaginationPageSize]="currentPageSize"

          [yueUiPaginationShowPageSizeChanger]="showPageSizer"
          [yueUiPaginationShowTotal]="showTotalLabel"

          (yueUiPaginationPageChange)="onPageChange($event)"
          (yueUiPaginationPageSizeChange)="onPageSizeChange($event)"
        ></yue-ui-pagination>
      </div>
    </ng-container>
  `,
  styleUrls: [
    `./../styles/table.component.less`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: `yueUiTableRef`,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-table]': 'true'
  }
})
export class YueUiTableComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  public destroy$: Subject<void> = new Subject();

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public data$: BehaviorSubject<(TableDataRowItem[])[]> = new BehaviorSubject<(TableDataRowItem[])[]>([]);

  public columns$: BehaviorSubject<TableDataColumnItem[]> = new BehaviorSubject<TableDataColumnItem[]>([]);

  public actions$: BehaviorSubject<YueUiTableActions> = new BehaviorSubject<YueUiTableActions>([]);

  public source!: TableSource<any>;

  public get totalOfItens(): number {
    if (this.source) {
      return this.source.fullTotalOfItens;
    }
    return 0;
  }

  public get currentPage(): number {
    if (this.source) {
      return this.source.page;
    }
    return 1;
  }

  public get currentPageSize(): number {
    if (this.source) {
      return this.source.pageSize;
    }
    return 20;
  }

  public get showHeader(): boolean {
    if (this.source) {
      return this.source.isShowingHeader;
    }
    return false;
  }

  public get showPagination(): boolean {
    if (this.source) {
      return this.source.isAllowedUsePagination;
    }
    return false;
  }

  public get showTotalLabel(): boolean {
    if (this.source) {
      return this.source.isAllowedShowTotalLabelOnPagination;
    }
    return false;
  }

  public get showPageSizer(): boolean {
    if (this.source) {
      return this.source.isAllowedShowPageSizeChanger;
    }
    return false;
  }

  public get hasData(): boolean {
    return this.data$.getValue().length > 0;
  }

  public get hasColumns(): boolean {
    return this.columns$.getValue().length > 0;
  }

  public get hasActions(): boolean {
    return this.actions$.getValue().length > 0;
  }

  @Input()
  public yueUiTableSource!: TableSource;

  constructor(public readonly cdr: ChangeDetectorRef) { }

  private overrideCurrentSource(): void {
    if (this.source) {
      this.source.disconnectRenderedStreamData();
      this.source.disconnectStreamDataHeader();
      this.source.disconnectStreamActions();
      this.destroy$.next();
    }

    this.source = this.yueUiTableSource;

    if (this.source) {
      this.source
        .connectStreamLoading()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (isLoading) => {
            this.loading$.next(isLoading);
            this.cdr.markForCheck();
          },
        });

      this.source
        .connectRenderedStreamData()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (values) => {
            this.data$.next(values);
            this.cdr.markForCheck();
          },
        });

      this.source
        .connectStreamDataHeader()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (values) => {
            this.columns$.next(values);
            this.cdr.markForCheck();
          },
        });

      this.source
        .connectStreamActions()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (values) => {
            this.actions$.next(values);
            this.cdr.markForCheck();
          },
        });

      this.source
        .connectStreamDestroy()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            if (this.source) {
              this.source
                .disconnectStreamActions()
                .disconnectRenderedStreamData()
                .disconnectStreamDataHeader();
            }
          }
        });
    }
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  public onTriggerAction(event: any): void {
    if (event.action && event.data) {
      if (this.source) {
        this.source.emitAction(event.action, event.data);
      }
    }
  }

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiTableSource } = changes;
    if (yueUiTableSource) {
      this.overrideCurrentSource();
    }
  }

  public handleClickOnColumnHeader(item: TableDataColumnItem<any>): void {
    if (item.allowSort) {
      if (!item.sorting) {
        this.source.updateSortAndOrder(item.identifier, `asc`);
      } else {
        if (item.sorting === `asc`) {
          this.source.updateSortAndOrder(item.identifier, `desc`);
        } else if (item.sorting === `desc`) {
          if (this.source.isAllowedIndeterminateSorting) {
            this.source.updateSortAndOrder(item.identifier, null);
          } else {
            this.source.updateSortAndOrder(item.identifier, `asc`);
          }
        }
      }
    }
  }

  public onPageChange(value: number): void {
    if (this.source) {
      if (this.source.page !== value) {
        this.source.updatePageAndPageSize(value);
      }
    }
  }

  public onPageSizeChange(value: number): void {
    if (this.source) {
      if (this.source.pageSize !== value) {
        this.source.updatePageAndPageSize(void 0, value);
      }
    }
  }

  public ngAfterViewInit(): void { }

  public ngOnDestroy(): void {
    if (this.source) {
      this.source.disconnectRenderedStreamData();
      this.source.disconnectStreamDataHeader();
      this.source.disconnectStreamActions();
    }

    this.data$.complete();
    this.columns$.complete();
    this.actions$.complete();

    this.loading$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

}
