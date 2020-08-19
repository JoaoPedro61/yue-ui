import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { TableSource } from './../table-source';

import { takeUntil } from 'rxjs/operators';
import { TableDataColumnItem, TableDataRowItem } from '../utils/interfaces';




@Component({
  selector: 'yue-ui-table',
  template: `
    <div class="yue-ui-table-wrapper">
      <div class="yue-ui-table-wrapper-inner">
        <ng-container *ngIf="source; else nosource">
          <ng-container *ngIf="hasColumns; else nocolumns">
            <ng-container *ngIf="hasData; else norows">
              <table class="yue-ui-table-el">
                <ng-container *ngIf="showHeader">
                  <thead class="yue-ui-table-header-el">
                    <tr class="yue-ui-table-header-row-el">
                      <ng-container *ngFor="let column of columns$ | async">
                        <th class="yue-ui-table-header-row-th-el">
                          <yue-ui-smart-render
                            [yueUiSmartRender]="column.cellHeader"
                            [yueUiSmartRenderContext]="column"
                          >
                          </yue-ui-smart-render>
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
                    </tr>
                  </ng-container>
                </tbody>
              </table>
            </ng-container>
            <ng-template #norows>
              No Rows!
            </ng-template>
          </ng-container>
          <ng-template #nocolumns>
            No Columns!
          </ng-template>
        </ng-container>
        <ng-template #nosource>
          No source!
        </ng-template>
      </div>
    </div>
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
export class YueUiTableComponent implements OnInit, OnDestroy, AfterViewInit {

  public destroy$: Subject<void> = new Subject();

  public data$: BehaviorSubject<(TableDataRowItem[])[]> = new BehaviorSubject<(TableDataRowItem[])[]>([]);

  public columns$: BehaviorSubject<TableDataColumnItem[]> = new BehaviorSubject<TableDataColumnItem[]>([]);

  public get showHeader(): boolean {
    return true;
  }

  public get hasData(): boolean {
    return this.data$.getValue().length > 0;
  }

  public get hasColumns(): boolean {
    return this.columns$.getValue().length > 0;
  }

  @Input()
  public source!: TableSource;

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.source
      .connectRenderedStreamData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (values) => this.data$.next(values),
      });

    this.source
      .connectStreamDataHeader()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (values) => this.columns$.next(values),
      });

    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.data$.complete();
    this.columns$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

}
