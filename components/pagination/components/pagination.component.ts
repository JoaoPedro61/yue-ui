import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { pager } from '../utils/pager';



@Component({
  selector: `yue-ui-pagination`,
  template: `
    <div class="yue-ui-pagination-wrapper">
      <div class="yue-ui-pagination-wrapper-inner">
        <div class="page-left-sider">
          <ng-container *ngIf="yueUiPaginationShowTotal">
            <div class="page-total-itens-wrapper">
              <div class="page-total-itens-wrapper-inner">
                <span class="page-total-label">
                  <yue-ui-i18n yueUiI18nToken="components.pagination.total"></yue-ui-i18n>
                  <span>:</span>
                </span>
                <span class="page-total-value" [innerText]="yueUiPaginationItensCount"></span>
              </div>
            </div>
          </ng-container>
        </div>
        <div class="page-itens-wrapper">
          <div class="page-itens-wrapper-inner">
            <ul class="page-item-list">
              <ng-container *ngFor="let pageItem of pages$ | async">
                <li class="page-item-list-item">
                  <a [class.selected]="pageItem === yueUiPaginationPage" (click)="setPage(pageItem);">
                    <span [innerText]="pageItem"></span>
                  </a>
                </li>
              </ng-container>
            </ul>
          </div>
        </div>
        <div class="page-right-sider">
          <div class="page-size-change-wrapper">
            <div class="page-size-change-wrapper-inner">
              <yue-ui-select
                [ngModel]="yueUiPaginationPageSize"
                [yueUiSelectAllowClear]="false"
                [yueUiSelectAllowSearch]="false"
                [yueUiSelectAllowEmpty]="false"
                [yueUiSelectPropertyLabel]="false"
                [yueUiSelectPropertyValue]="false"
                (ngModelChange)="onPageSizeChanged($event);"
              >
                <yue-ui-select-option
                  *ngFor="let option of pageSizeOptions$ | async"
                  [yueUiSelectOptionLabel]="'components.pagination.itemPerPage' | yueUiI18n : { count: option, default: option + ' / page' }"
                  [yueUiSelectOptionValue]="option"
                ></yue-ui-select-option>
              </yue-ui-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    `./../styles/pagination.component.less`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.yue-ui-pagination]': `true`,
  },
  preserveWhitespaces: false,
  exportAs: `yueUiPaginationRef`,
})
export class YueUiPaginationComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  public pages$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  public pageSizeOptions$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([
    20,
    30,
    50,
    100,
  ]);

  @Input()
  public yueUiPaginationItensCount!: number;

  @Input()
  public yueUiPaginationShowTotal = false;

  @Input()
  public yueUiPaginationShowPageSizeChanger = true;

  private _pageSize = 20;

  @Input()
  public set yueUiPaginationPageSize(value: number) {
    if (this._pageSize !== value) {
      this._pageSize = value;

      this.yueUiPaginationPageSizeChange.emit(value);
    }
  }

  public get yueUiPaginationPageSize(): number {
    return this._pageSize;
  }

  @Output()
  public yueUiPaginationPageSizeChange: EventEmitter<number> = new EventEmitter();

  private _page = 1;

  @Input()
  public set yueUiPaginationPage(value: number) {
    if (this._page !== value) {
      this._page = value;

      this.yueUiPaginationPageChange.emit(value);
    }
  }

  public get yueUiPaginationPage(): number {
    return this._page;
  }

  @Output()
  public yueUiPaginationPageChange: EventEmitter<number> = new EventEmitter();

  constructor(public readonly cdr: ChangeDetectorRef) {}

  private calculatePages(): void {
    const pagerDetails = pager(this.yueUiPaginationItensCount, this.yueUiPaginationPage, this.yueUiPaginationPageSize);
    this.pages$.next(pagerDetails.pages);
  }

  public onPageSizeChanged(value: any): void {
    if (value !== this.yueUiPaginationPageSize) {
      this.yueUiPaginationPageSize = value;
      this.calculatePages();
    }
  }

  public setPage(value: number): void {
    if (value !== this.yueUiPaginationPage) {
      this.yueUiPaginationPage = value;
      this.calculatePages();
    }
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiPaginationPage, yueUiPaginationItensCount, yueUiPaginationPageSize } = changes;
    if (yueUiPaginationPageSize) {
      const options = this.pageSizeOptions$.getValue() || [];
      let hasInCommonOptions = false;
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i] === this.yueUiPaginationPageSize) {
          hasInCommonOptions = true;
          break;
        }
      }
      if (!hasInCommonOptions) {
        options.push(this.yueUiPaginationPageSize);
        const ordered = options.slice().sort((a, b) => a - b);
        this.pageSizeOptions$.next(ordered);
      }
    }
    if (yueUiPaginationPage || yueUiPaginationItensCount) {
      this.calculatePages();
    }
  }

  public ngOnDestroy(): void {
    this.pages$.complete();
    this.pageSizeOptions$.complete();
  }

}
