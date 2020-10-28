import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';


import { YueUiFormularySelectSafeValue } from '../utils/interfaces';



@Component({
  selector: 'yue-ui-formulary-select-dropdown-item',
  template: `
    <div class="yue-ui-formulary-select-dropdown-item-content">
      <ng-container *ngIf="!customContent">
        <yue-ui-smart-render [yueUiSmartRender]="label"></yue-ui-smart-render>
      </ng-container>
      <ng-container *ngIf="customContent">
        <yue-ui-smart-render [yueUiSmartRender]="template"></yue-ui-smart-render>
      </ng-container>
    </div>
    <div *ngIf="showState && selected" class="yue-ui-formulary-select-dropdown-item-state" style="user-select: none" unselectable="on">
      <i yueUiIcon yueUiIconType="check"></i>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'yueUiFormularySelectOptionItemRef',
  host: {
    '[class.yue-ui-formulary-select-dropdown-item]': `true`,
    '[class.yue-ui-formulary-select-dropdown-item-selected]': 'selected && !disabled',
    '[class.yue-ui-formulary-select-dropdown-item-disabled]': 'disabled',
    '[class.yue-ui-formulary-select-dropdown-item-active]': 'activated && !disabled',
    '(mouseenter)': 'onHostMouseEnter()',
    '(click)': 'onHostClick()'
  }
})
export class YueUiFormularySelectDropdownItemComponent {

  public selected = false;

  public activated = false;

  @Input()
  public template: YueUiSmartRenderType | null = null;

  @Input()
  public disabled = false;

  @Input()
  public customContent = false;

  @Input()
  public showState = false;

  @Input()
  public label: YueUiSmartRenderType = null;

  @Input()
  public value: YueUiFormularySelectSafeValue | null = null;

  @Input()
  public activatedValue: YueUiFormularySelectSafeValue | null = null;

  @Input()
  public listOfSelectedValue: YueUiFormularySelectSafeValue[] = [];

  @Input()
  public compareWith!: (o1: YueUiFormularySelectSafeValue, o2: YueUiFormularySelectSafeValue) => boolean;

  @Output()
  public readonly itemClick = new EventEmitter<YueUiFormularySelectSafeValue>();

  @Output()
  public readonly itemHover = new EventEmitter<YueUiFormularySelectSafeValue>();

  public onHostMouseEnter(): void {
    if (!this.disabled) {
      this.itemHover.next(this.value);
    }
  }

  public onHostClick(): void {
    if (!this.disabled) {
      this.itemClick.next(this.value);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { value, activatedValue, listOfSelectedValue } = changes;
    if (value || listOfSelectedValue) {
      this.selected = this.listOfSelectedValue.some(v => this.compareWith(v, this.value));
    }
    if (value || activatedValue) {
      this.activated = this.compareWith(this.activatedValue, this.value);
    }
  }

}
