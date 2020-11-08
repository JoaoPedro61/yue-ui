import {
  AfterContentInit,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

import { deepTypeChecker, equals, hash } from '@joaopedro61/yue-ui/core/utils';

import { FieldBase } from '@joaopedro61/yue-ui/formulary/utils';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { YueUiFormularyMask } from '@joaopedro61/yue-ui/formulary/mask';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { FocusMonitor } from '@angular/cdk/a11y';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';



import {
  YueUiFormularySelectMode,
  YueUiFormularySelectSafeValue,
  YueUiFormularySelectFilter,
  YueUiFormularySelectItem,
  YueUiFormularySelectProperties,
  YueUiFormularySelectOption
} from './../utils/interfaces';
import { defaultFilter } from './../utils/filter';
import { createOption } from './../utils/setters';
import { YueUiFormularySelectSearchControlComponent } from './select-search-control.component';
import { YueUiFormularySelectOptionComponent } from './select-option.component';




@Component({
  selector: 'yue-ui-formulary-select',
  template: `
    <yue-ui-formulary-field-wrapper
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"

      [yueUiFormularyFieldWrapperPrepend]="prepend"
      [yueUiFormularyFieldWrapperAppend]="append"
      [yueUiFormularyFieldWrapperDisabled]="disabled"
      [yueUiFormularyFieldWrapperRenderContext]="{value: value}"
      [yueUiFormularyFieldWrapperShowClearHandler]="allowClear"
      [yueUiFormularyFieldWrapperFocused]="focused"
      [yueUiFormularyFieldWrapperIsEmpty]="isEmpty"
      (yueUiFormularyFieldWrapperOnClear)="clear();"
    >
      <yue-ui-formulary-select-search-control
        [placeholder]="placeholder"
        [mode]="mode"
        [open]="open"
        [autofocus]="initialFocus"
        [disabled]="disabled"
        [showSearch]="showSearch"
        [tokenSeparators]="tokenSeparators"
        [listOfTopItem]="listOfTopItem"
        [mask]="mask"

        (keydown)="onKeyDown($event)"
        (openChange)="setOpenState($event)"
        (inputValueChange)="onInputValueChange($event)"
        (tokenize)="onTokenSeparate($event)"
        (deleteItem)="onItemDelete($event)"
      >
      </yue-ui-formulary-select-search-control>
      <yue-ui-formulary-select-arrow
        *ngIf="showArrow"
        [search]="open && showSearch"
        (click)="setOpenState(!open)"
      ></yue-ui-formulary-select-arrow>
    </yue-ui-formulary-field-wrapper>

    <ng-template
      cdkConnectedOverlay
      yueUiConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayMinWidth]="$any(dropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(dropdownMatchSelectWidth ? triggerWidth : null)"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayTransformOriginOn]="'.yue-ui-formulary-select-dropdown'"
      [cdkConnectedOverlayPanelClass]="dropdownClassName!"
      (backdropClick)="setOpenState(false)"
      (detach)="setOpenState(false)"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayOpen]="open"
    >
      <yue-ui-formulary-select-dropdown-container
        [ngStyle]="dropdownStyle"
        [itemSize]="optionHeightPx"
        [maxItemLength]="optionOverflowSize"
        [matchWidth]="dropdownMatchSelectWidth"
        [class.yue-ui-formulary-select-dropdown-placement-bottomLeft]="dropDownPosition === 'bottom'"
        [class.yue-ui-formulary-select-dropdown-placement-topLeft]="dropDownPosition === 'top'"
        [listOfContainerItem]="listOfContainerItem"
        [notFoundContent]="notFoundContent"
        [activatedValue]="activatedValue"
        [listOfSelectedValue]="listOfValue"
        [dropdownRender]="dropdownRender"
        [compareWith]="compareWith"
        [mode]="mode"
        (keydown)="onKeyDown($event)"
        (itemClick)="onItemClick($event)"
        (scrollToBottom)="scrollToBottom.emit()"
      ></yue-ui-formulary-select-dropdown-container>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiFormularySelectComponent),
      multi: true,
    }
  ],
  host: {
    '[class.yue-ui-formulary-select]': `true`,
    '[class.yue-ui-formulary-select-multiple]': `mode === 'tags' || mode === 'multiple'`,
    '[class.yue-ui-formulary-field]': `true`,
  }
})
export class YueUiFormularySelectComponent extends FieldBase implements OnInit, ControlValueAccessor, AfterViewInit, AfterContentInit, OnChanges, OnDestroy {

  private destroy$ = new Subject<void>();

  @Input('yueUiFormularySelectPrepend')
  public prepend!: YueUiSmartRenderType;

  @Input('yueUiFormularySelectAppend')
  public append!: YueUiSmartRenderType;

  @Input('yueUiFormularySelectInitialFocus')
  public initialFocus = false;

  @Input('yueUiFormularySelectAllowClear')
  public allowClear = true;

  @Input('yueUiFormularySelectMask')
  public mask!: YueUiFormularyMask;

  @Input('yueUiFormularySelectId')
  public id = hash();

  @Input('yueUiFormularySelectPlaceholder')
  public placeholder: Observable<string> | string | null = '';

  @Input('yueUiFormularySelectMode')
  public mode: YueUiFormularySelectMode = 'single';

  @Input('yueUiFormularySelectAllowSearch')
  public showSearch = true;

  @Input('yueUiFormularySelectOptionHeightPx')
  public optionHeightPx = 32;

  @Input('yueUiFormularySelectOptionOverflowSize')
  public optionOverflowSize = 8;

  @Input('yueUiFormularySelectDropdownClassName')
  public dropdownClassName: string | null = null;

  @Input('yueUiFormularySelectDropdownMatchSelectWidth')
  public dropdownMatchSelectWidth = true;

  @Input('yueUiFormularySelectDropdownStyle')
  public dropdownStyle: { [key: string]: string } | null = null;

  @Input('yueUiFormularySelectNotFoundContent')
  public notFoundContent: YueUiSmartRenderType = undefined;

  @Input('yueUiFormularySelectDropdownRender')
  public dropdownRender: YueUiSmartRenderType = null;

  @Input('yueUiFormularySelectTokenSeparators')
  public tokenSeparators: string[] = [];

  @Input('yueUiFormularySelectFilterOption')
  public filterOption: YueUiFormularySelectFilter = defaultFilter;

  @Input('yueUiFormularySelectCompareWith')
  public compareWith: (o1: YueUiFormularySelectSafeValue, o2: YueUiFormularySelectSafeValue) => boolean = equals;

  @Input('yueUiFormularySelectOptions')
  public options: (YueUiFormularySelectOption | YueUiFormularySelectSafeValue)[] = [];

  @Input('yueUiFormularySelectAutoClearSearchValue')
  public autoClearSearchValue = true;

  @Input('yueUiFormularySelectServerSearch')
  public serverSearch = false;

  @Input('yueUiFormularySelectOpen')
  public open = false;

  private _showArrow: boolean | undefined;

  @Input('yueUiFormularySelectShowArrow')
  public set showArrow(value: boolean) {
    this._showArrow = value;
  }

  public get showArrow(): boolean {
    return this._showArrow === undefined ? this.mode === 'single' : this._showArrow;
  }

  @Input('yueUiFormularySelectPropertyLabel')
  public propLabel: YueUiFormularySelectProperties['label'] = 'label';

  @Input('yueUiFormularySelectPropertyValue')
  public propValue: YueUiFormularySelectProperties['value'] = 'value';

  @Input('yueUiFormularySelectDisable')
  public set reactiveDisabled(value: boolean) {
    this.setDisabledState(value);
  }

  @Output('yueUiFormularySelectOnSearch')
  public readonly onSearch = new EventEmitter<string>();

  @Output('yueUiFormularySelectScrollToBottom')
  public readonly scrollToBottom = new EventEmitter<void>();

  @Output('yueUiFormularySelectOpenChange')
  public readonly openChange = new EventEmitter<boolean>();

  @Output('yueUiFormularySelectFocus')
  public onFocus: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularySelectBlur')
  public onBlur: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularySelectKeydown')
  public onKeydown: EventEmitter<any> = new EventEmitter();

  @Output('yueUiFormularySelectKeyup')
  public onKeyup: EventEmitter<any> = new EventEmitter();

  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef })
  public originElement!: ElementRef;

  @ViewChild(CdkConnectedOverlay, { static: true })
  public cdkConnectedOverlay!: CdkConnectedOverlay;

  @ViewChild(YueUiFormularySelectSearchControlComponent, { static: true })
  public yueUiFormularySelectSearchControlComponent!: YueUiFormularySelectSearchControlComponent;

  @ViewChild(YueUiFormularySelectSearchControlComponent, { static: true, read: ElementRef })
  public yueUiFormularySelectSearchControlComponentElement!: ElementRef;

  @ContentChildren(YueUiFormularySelectOptionComponent, { descendants: true })
  public listOfYueUiFormularySelectOptionComponent!: QueryList<YueUiFormularySelectOptionComponent>;

  private listOfValue$ = new BehaviorSubject<YueUiFormularySelectSafeValue[]>([]);

  private listOfTemplateItem$ = new BehaviorSubject<YueUiFormularySelectItem[]>([]);

  private listOfTagAndTemplateItem: YueUiFormularySelectItem[] = [];

  private searchValue: string = '';

  private isReactiveDriven = false;

  public dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';

  public triggerWidth: number | null = null;

  public listOfContainerItem: YueUiFormularySelectItem[] = [];

  public listOfTopItem: YueUiFormularySelectItem[] = [];

  public activatedValue: YueUiFormularySelectSafeValue | null = null;

  public listOfValue: YueUiFormularySelectSafeValue[] = [];

  public focused = false;

  private _val: any = null;

  public set value(v: any) {
    this._val = v;
    this.onChange(this._val);
    this.onTouch();
  }

  public get value(): any {
    return this._val;
  }

  public onChange: (newValue: any) => void = () => { };

  public onTouch: () => void = () => { };

  constructor(
    public readonly cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private platform: Platform,
    private focusMonitor: FocusMonitor,
  ) {
    super();
  }

  public generateTagItem(value: string): YueUiFormularySelectItem {
    return createOption({
      data: value,
      propLabel: this.propLabel,
      propValue: this.propValue,
      disabled: false,
      selected: false,
      customContent: false,
      template: null
    });
  }

  public onItemClick(value: YueUiFormularySelectSafeValue): void {
    this.activatedValue = value;
    if (this.mode === 'single') {
      if (this.listOfValue.length === 0 || !this.compareWith(this.listOfValue[0], value)) {
        this.updateListOfValue([value]);
      }
      this.setOpenState(false);
    } else {
      const targetIndex = this.listOfValue.findIndex(o => this.compareWith(o, value));
      if (targetIndex !== -1) {
        const listOfValueAfterRemoved = this.listOfValue.filter((_, i) => i !== targetIndex);
        this.updateListOfValue(listOfValueAfterRemoved);
      } else {
        const listOfValueAfterAdded = [...this.listOfValue, value];
        this.updateListOfValue(listOfValueAfterAdded);
      }
      this.focus();
      if (this.autoClearSearchValue) {
        this.clearInput();
      }
    }
  }

  public onItemDelete(item: YueUiFormularySelectItem): void {
    const listOfSelectedValue = this.listOfValue.filter(v => !this.compareWith(v, item.value));
    this.updateListOfValue(listOfSelectedValue);
    this.clearInput();
  }

  public updateListOfContainerItem(): void {
    let listOfContainerItem = this.listOfTagAndTemplateItem
      .filter(item => {
        if (!this.serverSearch && this.searchValue) {
          return this.filterOption(this.searchValue, item);
        } else {
          return true;
        }
      });
    if (this.mode === 'tags' && this.searchValue) {
      const matchedItem = this.listOfTagAndTemplateItem.find(item => item.label === this.searchValue);
      if (!matchedItem) {
        const tagItem = this.generateTagItem(this.searchValue);
        listOfContainerItem = [tagItem, ...listOfContainerItem];
        this.activatedValue = tagItem.value;
      } else {
        this.activatedValue = matchedItem.value;
      }
    }
    if (this.listOfValue.length !== 0 && listOfContainerItem.findIndex(item => this.compareWith(item.value, this.activatedValue)) === -1) {
      const activatedItem = listOfContainerItem.find(item => this.compareWith(item.value, this.listOfValue[0])) || listOfContainerItem[0];
      this.activatedValue = (activatedItem && activatedItem.value) || null;
    }
    this.listOfContainerItem = [...listOfContainerItem];
    this.updateCdkConnectedOverlayPositions();
  }

  public beforeClear(): void {
    this.updateListOfValue([]);
  }

  public clearInput(): void {
    this.yueUiFormularySelectSearchControlComponent.clearInputValue();
  }

  public updateListOfValue(listOfValue: YueUiFormularySelectSafeValue[]): void {
    const covertListToModel = (list: YueUiFormularySelectSafeValue[], mode: YueUiFormularySelectMode): YueUiFormularySelectSafeValue[] | YueUiFormularySelectSafeValue => {
      if (mode === 'single') {
        if (list.length > 0) {
          return list[0];
        } else {
          return null;
        }
      } else {
        return list;
      }
    };
    const model = covertListToModel(listOfValue, this.mode);
    if (this.value !== model) {
      this.listOfValue = listOfValue;
      this.listOfValue$.next(listOfValue);
      this.value = model;
      this.onChange(this.value);
    }
    this.yueUiFormularySelectSearchControlComponent.updateTemplateVariable();
  }

  public onTokenSeparate(listOfLabel: string[]): void {
    const listOfMatchedValue = this.listOfTagAndTemplateItem
      .filter(item => listOfLabel.findIndex(label => label === item.label) !== -1)
      .map(item => item.value)
      .filter(item => this.listOfValue.findIndex(v => this.compareWith(v, item)) === -1);
    if (this.mode === 'multiple') {
      this.updateListOfValue([...this.listOfValue, ...listOfMatchedValue]);
    } else if (this.mode === 'tags') {
      const listOfUnMatchedLabel = listOfLabel.filter(
        label => this.listOfTagAndTemplateItem.findIndex(item => item.label === label) === -1
      );
      this.updateListOfValue([...this.listOfValue, ...listOfMatchedValue, ...listOfUnMatchedLabel]);
    }
    this.clearInput();
  }

  public onKeyDown(e: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }
    const listOfFilteredOptionNotDisabled = this.listOfContainerItem.filter(item => !item.disabled);
    const activatedIndex = listOfFilteredOptionNotDisabled.findIndex(item => this.compareWith(item.value, this.activatedValue));
    switch (e.keyCode) {
      case UP_ARROW:
        e.preventDefault();
        if (this.open) {
          const preIndex = activatedIndex > 0 ? activatedIndex - 1 : listOfFilteredOptionNotDisabled.length - 1;
          this.activatedValue = listOfFilteredOptionNotDisabled[preIndex].value;
        }
        break;
      case DOWN_ARROW:
        e.preventDefault();
        if (this.open) {
          const nextIndex = activatedIndex < listOfFilteredOptionNotDisabled.length - 1 ? activatedIndex + 1 : 0;
          this.activatedValue = listOfFilteredOptionNotDisabled[nextIndex].value;
        } else {
          this.setOpenState(true);
        }
        break;
      case ENTER:
        e.preventDefault();
        if (this.open) {
          if (this.activatedValue) {
            this.onItemClick(this.activatedValue);
          }
        } else {
          this.setOpenState(true);
        }
        break;
      case SPACE:
        if (!this.open) {
          this.setOpenState(true);
          e.preventDefault();
        }
        break;
      case TAB:
        this.setOpenState(false);
        break;
      case ESCAPE:
        this.setOpenState(false);
        break;
      default:
        if (!this.open) {
          this.setOpenState(true);
        }
    }
  }

  public setOpenState(value: boolean): void {
    if (this.open !== value) {
      this.open = value;
      this.openChange.emit(value);
      this.onOpenChange();
      this.cdr.markForCheck();
    }
  }

  public onOpenChange(): void {
    this.updateCdkConnectedOverlayStatus();
    this.clearInput();
  }

  public onInputValueChange(value: string): void {
    this.searchValue = value;
    this.updateListOfContainerItem();
    this.onSearch.emit(value);
    this.updateCdkConnectedOverlayPositions();
  }

  public onClearSelection(): void {
    this.updateListOfValue([]);
  }

  public focus(): void {
    this.yueUiFormularySelectSearchControlComponent.focus();
  }

  public blur(): void {
    this.yueUiFormularySelectSearchControlComponent.blur();
  }

  public onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }

  public updateCdkConnectedOverlayStatus(): void {
    if (this.platform.isBrowser && this.originElement.nativeElement) {
      this.triggerWidth = this.originElement.nativeElement.getBoundingClientRect().width;
    }
  }

  public updateCdkConnectedOverlayPositions(): void {
    if (this.cdkConnectedOverlay.overlayRef) {
      this.cdkConnectedOverlay.overlayRef.updatePosition();
    }
  }

  public writeValue(value: any): void {
    if (this.value !== value) {
      this.value = value;
      const covertModelToList = (model: YueUiFormularySelectSafeValue[] | YueUiFormularySelectSafeValue, mode: YueUiFormularySelectMode): YueUiFormularySelectSafeValue[] => {        
        if (model === null || model === undefined) {
          return [];
        } else if (mode === 'single') {
          return [model];
        } else {
          return model;
        }
      };
      const listOfValue = covertModelToList(value, this.mode);
      this.listOfValue = listOfValue;
      this.listOfValue$.next(listOfValue);
      this.cdr.markForCheck();
    }
  }

  public setDisabledState(isDisabled?: boolean): void {
    if (typeof isDisabled === 'boolean') {
      if (isDisabled) {
        this.setOpenState(false);
      }
      this.disabled = isDisabled;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { open, disabled, options } = changes;

    if (open) {
      this.onOpenChange();
    }
    if (disabled && this.disabled) {
      this.setOpenState(false);
    }
    if (options) {
      this.isReactiveDriven = true;
      const listOfOptions = this.options || [];
      const listOfTransformedItem = listOfOptions.map(item => {
        if (!Array.isArray(item) && deepTypeChecker(item) === 'object') {
          return createOption({
            data: item.data,
            propLabel: item.label instanceof TemplateRef ? false : this.propLabel,
            propValue: this.propValue,
            disabled: !!item.disabled,
            selected: false,
            template: item.label instanceof TemplateRef ? item.label : null,
            customContent: !!item.customContent,
          });
        } else {
          return createOption({
            data: item,
            propLabel: false,
            propValue: false,
            disabled: false,
            selected: false,
            template: null,
          });
        }
      });
      this.listOfTemplateItem$.next(listOfTransformedItem);
    }
  }

  public ngOnInit(): void {
    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          this.focused = false;
          this.cdr.markForCheck();
          this.onBlur.emit();
          Promise.resolve().then(() => {
            this.onTouch();
          });
        } else {
          this.focused = true;
          this.cdr.markForCheck();
          this.onFocus.emit();
        }
      });
    combineLatest([this.listOfValue$, this.listOfTemplateItem$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([listOfSelectedValue, listOfTemplateItem]) => {
        const listOfTagItem = (listOfSelectedValue || [])
          .filter(() => this.mode === 'tags')
          .filter(value => (listOfTemplateItem || []).findIndex(o => this.compareWith(o.value, value)) === -1)
          .map(value => this.listOfTopItem.find(o => this.compareWith(o.value, value)) || this.generateTagItem(value));
        this.listOfTagAndTemplateItem = [...(listOfTemplateItem || []), ...listOfTagItem];
        this.listOfTopItem = this.listOfValue
          .map(v => [...this.listOfTagAndTemplateItem, ...this.listOfTopItem].find(item => this.compareWith(v, item.value))!)
          .filter(item => !!item);
        this.updateListOfContainerItem();
      });
  }

  public ngAfterViewInit(): void {
    this.updateCdkConnectedOverlayStatus();
  }

  public ngAfterContentInit(): void {
    if (!this.isReactiveDriven) {
      merge(this.listOfYueUiFormularySelectOptionComponent.changes)
        .pipe(
          startWith(true),
          switchMap(() =>
            merge(
              ...[
                this.listOfYueUiFormularySelectOptionComponent.changes,
                ...this.listOfYueUiFormularySelectOptionComponent.map(option => option.changes),
              ]
            ).pipe(startWith(true))
          ),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          const listOfOptionInterface = this.listOfYueUiFormularySelectOptionComponent.toArray().map(item => {
            const { template, value, label, disabled, customContent } = item;

            let data = value;
            
            if (this.propLabel || this.propValue) {
              if (typeof value === 'object') {
                data = value;
              } else {
                data = {
                  ...(this.propLabel ? {
                    [this.propLabel]: typeof label === 'object' ? (label as any)[this.propLabel] : label,
                  } : {}),
                  ...(this.propValue ? {
                    [this.propValue]: typeof value === 'object' ? (value as any)[this.propValue] : value,
                  } : {}),
                };
              }
            }

            const itemWithSetters = createOption({
              data,
              propLabel: this.propLabel,
              propValue: this.propValue,
              disabled,
              template,
              selected: false,
              customContent,
            });

            return itemWithSetters;
          });
          this.listOfTemplateItem$.next(listOfOptionInterface);
          this.cdr.markForCheck();
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.listOfTemplateItem$.complete();

    this.listOfValue$.complete();
  }

}
