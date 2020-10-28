import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  ViewChild,
  TemplateRef,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { YueUiFormularySelectItem, YueUiFormularySelectSafeValue, YueUiFormularySelectMode } from '../utils/interfaces';



@Component({
  selector: 'yue-ui-formulary-select-dropdown-container',
  template: `
    <div>
      <div *ngIf="listOfContainerItem.length === 0" class="yue-ui-formulary-select-dropdown-empty">
        <ng-container *ngIf="notFoundContent; else notTmp">
          <yue-ui-smart-render [yueUiSmartRender]="notFoundContent"></yue-ui-smart-render>
        </ng-container>
        <ng-template #notTmp>
          <yue-ui-i18n yueUiI18nToken="components.select.noData" [yueUiI18nParameters]="{ default: 'No data!' }"></yue-ui-i18n>
        </ng-template>
      </div>
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize * maxItemLength"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize"
        [style.max-height.px]="itemSize * maxItemLength"
      >
        <ng-template
          cdkVirtualFor
          [cdkVirtualForOf]="listOfContainerItem"
          [cdkVirtualForTrackBy]="trackValue"
          [cdkVirtualForTemplateCacheSize]="0"
          let-item
        >
          <yue-ui-formulary-select-dropdown-item
            [template]="item.template"
            [disabled]="item.disabled"
            [showState]="mode === 'tags' || mode === 'multiple'"
            [label]="item.label"
            [compareWith]="compareWith"
            [activatedValue]="activatedValue"
            [listOfSelectedValue]="listOfSelectedValue"
            [value]="item.value"
            (itemHover)="onItemHover($event)"
            (itemClick)="onItemClick($event)"
          ></yue-ui-formulary-select-dropdown-item>
        </ng-template>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender"></ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.yue-ui-formulary-select-dropdown]': `true`,
  }
})
export class YueUiFormularySelectDropdownContainerComponent implements AfterViewInit, OnChanges {
  
  @Input()
  public notFoundContent: string | TemplateRef<YueUiFormularySelectSafeValue> | undefined = undefined;

  @Input()
  public dropdownRender: TemplateRef<YueUiFormularySelectSafeValue> | null = null;

  @Input()
  public activatedValue: YueUiFormularySelectSafeValue | null = null;

  @Input()
  public listOfSelectedValue: YueUiFormularySelectSafeValue[] = [];

  @Input()
  public compareWith!: (o1: YueUiFormularySelectSafeValue, o2: YueUiFormularySelectSafeValue) => boolean;

  @Input()
  public mode: YueUiFormularySelectMode = 'single';

  @Input()
  public matchWidth = true;

  @Input()
  public itemSize = 32;

  @Input()
  public maxItemLength = 8;

  @Input()
  public listOfContainerItem: YueUiFormularySelectItem[] = [];

  @Output()
  public readonly itemClick = new EventEmitter<YueUiFormularySelectSafeValue>();

  @Output()
  public readonly scrollToBottom = new EventEmitter<void>();

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  public cdkVirtualScrollViewport!: CdkVirtualScrollViewport;

  private scrolledIndex = 0;

  public onItemClick(value: YueUiFormularySelectSafeValue): void {
    this.itemClick.emit(value);
  }

  public onItemHover(value: YueUiFormularySelectSafeValue): void {
    this.activatedValue = value;
  }

  public trackValue(_index: number, option: YueUiFormularySelectItem): YueUiFormularySelectSafeValue {
    return option.value;
  }

  public onScrolledIndexChange(index: number): void {
    this.scrolledIndex = index;
    if (index === this.listOfContainerItem.length - this.maxItemLength) {
      this.scrollToBottom.emit();
    }
  }

  public scrollToActivatedValue(): void {
    const index = this.listOfContainerItem.findIndex(item => this.compareWith(item.value, this.activatedValue));
    if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
      this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { listOfContainerItem, activatedValue } = changes;
    if (listOfContainerItem || activatedValue) {
      this.scrollToActivatedValue();
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.scrollToActivatedValue());
  }

}
