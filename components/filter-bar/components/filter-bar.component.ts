import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Output, EventEmitter, OnInit, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';

import { Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';

import { YUE_UI_SMALL_LAYOUT_BREAKPOINTS } from '@joaopedro61/yue-ui/core/services';
import { equals } from '@joaopedro61/yue-ui/core/utils';
import { YueUiModalRef, YueUiModalService } from '@joaopedro61/yue-ui/modal';
import { YueUiI18nService } from '@joaopedro61/yue-ui/i18n';


import { YueUiFilterBarPopupComponent } from './filter-bar-popup.component';
import { FilterBarSource } from '../filter-source';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-filter-bar`,
  template: `
    <ng-container *ngIf="source">
      <div class="yue-ui-filter-bar-inner">
        <div class="yue-ui-filter-bar-inner-docked">
          <div class="yue-ui-filter-bar-inner-docked-formulary">
            <yue-ui-formulary [yueUiFormularySource]="source.sourceFormulary"></yue-ui-formulary>
          </div>
          <div class="yue-ui-filter-bar-inner-docked-buttons">
            <ng-container *ngIf="source.hasFieldInSourceFormularyAdditional">
              <ng-container *ngIf="!isSmallScreen; else thereAreInNoSmallScreen">
                <button
                  yueUiButton
  
                  [yueUiPopover]="'components.filterBar.moreFilters' | yueUiI18n: { default: 'More filters' }"
                  [yueUiPopoverVisible]="visible"
                  [yueUiPopoverStyles]="{'maxWidth.px': 500, 'width.px': 500}"
                  [yueUiPopoverContent]="popover"
                  (yueUiPopoverVisibleChange)="popoverIsVisible = $event;"
                  yueUiPopoverPlacement="bottomLeft"
      
                  [yueUiTooltip]="'components.filterBar.moreFilters' | yueUiI18n: { default: 'More filters' }"
      
                  aria-hidden="true"
                  aria-label="Show more filters"
                >
                  <i yueUiIcon yueUiIconType="filter" yueuiIconTheme="outline" aria-hidden="true" [style.marginRight.px]="0"></i>
                  <ng-template #popover>
                    <div class="yue-ui-filter-bar-inner-docked-formulary-popuped">
                      <yue-ui-filter-bar-popup [yueUiFilterBarSource]="source"></yue-ui-filter-bar-popup>
                    </div>
                  </ng-template>
                </button>
              </ng-container>
              <ng-template #thereAreInNoSmallScreen>
                <button
                  yueUiButton
                  (click)="openModal();"
                  [yueUiTooltip]="'components.filterBar.moreFilters' | yueUiI18n: { default: 'More filters' }"
                  aria-hidden="true"
                  aria-label="Show more filters"
                >
                  <i yueUiIcon yueUiIconType="filter" yueuiIconTheme="outline" aria-hidden="true" [style.marginRight.px]="0"></i>
                </button>
              </ng-template>
            </ng-container>
            <button
              yueUiButton
              (click)="clearFilters();"
              [yueUiTooltip]="'components.filterBar.clearFilters' | yueUiI18n: { default: 'Clear filters' }"
              aria-hidden="true"
              aria-label="Clear all filters"
            >
              <i yueUiIcon yueUiIconType="clear" yueuiIconTheme="outline" aria-hidden="true" [style.marginRight.px]="0"></i>
            </button>
            <button yueUiButton aria-hidden="true" aria-label="Search" (click)="source.search();">
              <i yueUiIcon yueUiIconType="search" yueuiIconTheme="outline" aria-hidden="true"></i>
              <yue-ui-i18n yueUiI18nToken="components.filterBar.search" [yueUiI18nParameters]="{ default: 'Search' }"></yue-ui-i18n>
            </button>
          </div>
        </div>
        <div class="yue-ui-filter-bar-inner-docked">
          <ng-content></ng-content>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiFilterBarRef',
  host: {
    '[class.yue-ui-filter-bar]': `true`,
    '[class.yue-ui-filter-bar-in-small-screen]': `isSmallScreen`,
  },
})
export class YueUiFilterBarComponent implements OnInit, OnDestroy, OnChanges {

  private readonly destroy$: Subject<void> = new Subject();

  public isSmallScreen = false;

  public visible = false;

  public popoverIsVisible = false;

  public modalIsVisible = false;

  public modalRef!: YueUiModalRef<any>;

  public source!: FilterBarSource;

  @Input(`yueUiFilterBarSource`)
  public sourceInput!: FilterBarSource;

  @Output()
  public readonly onMatchSmallScreen: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly cdr: ChangeDetectorRef,
    private readonly modal: YueUiModalService,
    private readonly i18n: YueUiI18nService,
  ) {
    this.breakpointObserver
      .observe(YUE_UI_SMALL_LAYOUT_BREAKPOINTS)
      .pipe(takeUntil(this.destroy$), distinctUntilChanged(equals))
      .subscribe({
        next: (result) => {
          this.visible = false;
          this.modalIsVisible = false;
          this.popoverIsVisible = false;
          if (this.modalRef) {
            this.modalRef.close();
          }
          this.isSmallScreen = result.matches;
          this.onMatchSmallScreen.emit(result.matches);
          this.cdr.markForCheck();
        }
      });
  }

  private overrideInputSource(): void {
    this.source = this.sourceInput;
  }

  public clearFilters(): void {
    this.source.clear();
    this.source.search();
    this.cdr.markForCheck();
  }

  public openModal(): void {
    if (!this.source.hasFieldInSourceFormularyAdditional) {
      return void 0;
    }

    const ref = this.modalRef = this.modal.create({
      header: this.i18n.translate('components.filterBar.moreFilters', { default: 'More filters' }),
      footer: undefined,
      okButtonText: undefined,
      cancelButtonText: undefined,
      content: YueUiFilterBarPopupComponent,
      componentParams: {
        sourceInput: this.source,
      },
      closable: true,
      maskClosable: true,
      keyboard: true,
      disposeOnNavigation: true,
      showMask: true,
      width: `90%`,
    });

    ref.afterOpen
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.modalIsVisible = true;
        }
      });

    ref.afterClose
      .pipe(take(1))
      .subscribe({
        next: (result?: string) => {
          if (typeof result === `string`) {
            if (result === `clear`) {
              this.clearFilters();
            } else if (result === `search`) {
              this.source.search();
            }
          } else {
            this.modalIsVisible = false;
          }
        }
      });
  }

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    const { sourceInput } = changes;
    if (sourceInput) {
      this.overrideInputSource();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
