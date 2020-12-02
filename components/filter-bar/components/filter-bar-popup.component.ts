import { Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, AfterViewInit, Input, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { YueUiModalRef } from '@joaopedro61/yue-ui/modal';

import { FilterBarSource } from '../filter-source';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-filter-bar-popup`,
  template: `
    <ng-container *ngIf="source">
      <yue-ui-formulary [yueUiFormularySource]="source.sourceFormularyAdditional"></yue-ui-formulary>
      <ng-container *ngIf="insideInTheModal">
        <div *yueUiModalFooter>
          <div class="yue-ui-filter-bar-popup-footer">
            <button
              yueUiButton
              (click)="clear();"
              [yueUiTooltip]="'components.filterBar.clearFilters' | yueUiI18n: { default: 'Clear filters' }"
              aria-hidden="true"
              aria-label="Clear filters"
            >
              <i yueUiIcon yueUiIconType="clear" yueuiIconTheme="outline" aria-hidden="true"></i>
              <yue-ui-i18n yueUiI18nToken="components.filterBar.clearFilters" [yueUiI18nParameters]="{ default: 'Clear filters' }"></yue-ui-i18n>
            </button>

            <button
              yueUiButton
              (click)="search();"
              [yueUiTooltip]="'components.filterBar.search' | yueUiI18n: { default: 'Search' }"
              aria-hidden="true"
              aria-label="Search"
            >
              <i yueUiIcon yueUiIconType="search" yueuiIconTheme="outline" aria-hidden="true"></i>
              <yue-ui-i18n yueUiI18nToken="components.filterBar.search" [yueUiI18nParameters]="{ default: 'Search' }"></yue-ui-i18n>
            </button>
          </div>
        </div>
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiFilterBarPopupRef',
  host: {
    '[class.yue-ui-filter-bar-popup]': `true`,
  },
})
export class YueUiFilterBarPopupComponent implements AfterViewInit, OnDestroy, OnChanges {

  @Input(`yueUiFilterBarSource`)
  public sourceInput!: FilterBarSource;

  public source!: FilterBarSource;

  public get insideInTheModal(): boolean {
    return !!this.modalRef;
  }

  constructor(public readonly cdr: ChangeDetectorRef, @Optional() private readonly modalRef?: YueUiModalRef<YueUiFilterBarPopupComponent>) { }

  public search(): void {
    if (this.modalRef) {
      this.modalRef.close(`search`);
    }
  }

  public clear(): void {
    if (this.modalRef) {
      this.modalRef.close(`clear`);
    }
  }

  private overrideInputSource(): void {
    this.source = this.sourceInput;
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  public ngAfterViewInit(): void {
    this.overrideInputSource();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { sourceInput } = changes;
    if (sourceInput) {
      this.overrideInputSource();
    }
  }

  public ngOnDestroy(): void { }

}
