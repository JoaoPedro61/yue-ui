import { BACKSPACE } from '@angular/cdk/keycodes';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { YueUiFormularyMask } from '@joaopedro61/yue-ui/formulary/mask';

import { YueUiFormularySelectMode, YueUiFormularySelectSafeValue, YueUiFormularySelectItem } from './../utils/interfaces';
import { YueUiFormularySelectSearchComponent } from './select-search.component';




@Component({
  selector: 'yue-ui-formulary-select-search-control',
  template: `
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'single'">
        <yue-ui-formulary-select-search-control-item
          *ngIf="isShowSingleLabel"
          [deletable]="false"
          [disabled]="false"
          [label]="listOfTopItem[0].label"
        ></yue-ui-formulary-select-search-control-item>
        <yue-ui-formulary-select-search
          [mask]="mask"
          [disabled]="disabled"
          [value]="inputValue!"
          [showInput]="open && showSearch"
          [mirrorSync]="false"
          [autofocus]="autofocus"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></yue-ui-formulary-select-search>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <yue-ui-formulary-select-search-control-item
          *ngFor="let item of listOfTopItem; trackBy: trackValue"
          [label]="item.label"
          [disabled]="item.disabled || disabled"
          [deletable]="true"
          (delete)="onDeleteItem(item);"
        >
        </yue-ui-formulary-select-search-control-item>
        <yue-ui-formulary-select-search
          [mask]="mask"
          [disabled]="disabled"
          [value]="inputValue!"
          [autofocus]="autofocus"
          [showInput]="true"
          [mirrorSync]="true"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></yue-ui-formulary-select-search>
      </ng-container>
    </ng-container>
    <yue-ui-formulary-select-search-control-placeholder
      *ngIf="isShowPlaceholder"
      [placeholder]="placeholder"
    ></yue-ui-formulary-select-search-control-placeholder>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  exportAs: 'yueUiFormularySelectSearchControlRef',
  host: {
    '[class.yue-ui-formulary-select-search-control]': 'true',
    '[class.yue-ui-formulary-select-search-control-multiple]': 'mode === "tags" || mode === "multiple"',
    '(click)': `onHostClick()`,
    '(keydown)': `onHostKeydown($event)`
  },
})
export class YueUiFormularySelectSearchControlComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('placeholder')
  public placeholder: Observable<string> | string | null = '';

  @Input('mode')
  public mode: YueUiFormularySelectMode = 'single';

  @Input('open')
  public open = false;

  @Input('autofocus')
  public autofocus = false;

  @Input('disabled')
  public disabled = false;

  @Input('showSearch')
  public showSearch = false;

  @Input('tokenSeparators')
  public tokenSeparators: string[] = [];

  @Input('mask')
  public mask!: YueUiFormularyMask;

  @Output('openChange')
  public openChange: EventEmitter<boolean> = new EventEmitter();

  @Output('inputValueChange')
  public readonly inputValueChange = new EventEmitter<string>();

  @Output('tokenize')
  public readonly tokenize = new EventEmitter<string[]>();

  @Output('deleteItem')
  public readonly deleteItem = new EventEmitter<any>();

  @ViewChild(YueUiFormularySelectSearchComponent)
  public readonly yueUiFormularySelectSearchComponent!: YueUiFormularySelectSearchComponent;

  @Input('listOfTopItem')
  public listOfTopItem: YueUiFormularySelectItem[] = [];

  public isComposing = false;

  public isShowPlaceholder = true;

  public isShowSingleLabel = false;

  public inputValue: string | null | undefined = null;

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public onHostClick(): void {
    if (!this.disabled) {
      this.openChange.next(!this.open);
    }
  }

  public onHostKeydown(e: KeyboardEvent): void {
    const inputValue = (e.target as HTMLInputElement).value;
    if (e.keyCode === BACKSPACE && this.mode !== 'single' && !inputValue && this.listOfTopItem.length > 0) {
      e.preventDefault();
      this.onDeleteItem(this.listOfTopItem[this.listOfTopItem.length - 1]);
    }
  }

  public updateTemplateVariable(): void {
    const isSelectedValueEmpty = this.listOfTopItem.length === 0;
    this.isShowPlaceholder = isSelectedValueEmpty && !this.isComposing && !this.inputValue;
    this.isShowSingleLabel = !isSelectedValueEmpty && !this.isComposing && !this.inputValue;
    this.cdr.markForCheck();
  }

  public isComposingChange(isComposing: boolean): void {
    this.isComposing = isComposing;
    this.updateTemplateVariable();
  }

  public onInputValueChange(value: string): void {
    if (value !== this.inputValue) {
      this.inputValue = value;
      this.updateTemplateVariable();
      this.inputValueChange.emit(value);
      this.tokenSeparate(value, this.tokenSeparators);
    }
  }

  public tokenSeparate(inputValue: string, tokenSeparators: string[]): void {
    const includesSeparators = (str: string | string[], separators: string[]): boolean => {
      for (let i = 0, l = separators.length; i < l; ++i) {
        if (str.lastIndexOf(separators[i]) > 0) {
          return true;
        }
      }
      return false;
    };
    const splitBySeparators = (str: string | string[], separators: string[]): string[] => {
      const reg = new RegExp(`[${separators.join()}]`);
      const array = (str as string).split(reg).filter(token => token);
      return [...new Set(array)];
    };
    if (inputValue && inputValue.length && tokenSeparators.length && this.mode !== 'single' && includesSeparators(inputValue, tokenSeparators)) {
      const listOfLabel = splitBySeparators(inputValue, tokenSeparators);
      this.tokenize.next(listOfLabel);
    }
  }

  public clearInputValue(): void {
    if (this.yueUiFormularySelectSearchComponent) {
      this.yueUiFormularySelectSearchComponent.clearInputValue();
    }
  }

  public focus(): void {
    if (this.yueUiFormularySelectSearchComponent) {
      this.yueUiFormularySelectSearchComponent.focus();
    }
  }

  public blur(): void {
    if (this.yueUiFormularySelectSearchComponent) {
      this.yueUiFormularySelectSearchComponent.blur();
    }
  }

  public trackValue(_index: number, option: YueUiFormularySelectItem): YueUiFormularySelectSafeValue {
    return option.value;
  }

  public onDeleteItem(item: YueUiFormularySelectItem): void {
    if (!this.disabled && !item.disabled) {
      this.deleteItem.next(item);
    }
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
  }

  public ngOnDestroy(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { listOfTopItem } = changes;
    if (listOfTopItem) {
      this.updateTemplateVariable();
    }
  }

}
