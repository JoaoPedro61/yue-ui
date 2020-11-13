import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { YueUiMenuMode } from './../utils/types';




@Component({
  selector: '[yue-ui-submenu-none-inline-child]',
  exportAs: 'yueUiSubmenuNoneInlineChildRef',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class.yue-ui-dropdown-menu]="isMenuInsideDropDown"
      [class.yue-ui-menu]="!isMenuInsideDropDown"
      [class.yue-ui-dropdown-menu-vertical]="isMenuInsideDropDown"
      [class.yue-ui-menu-vertical]="!isMenuInsideDropDown"
      [class.yue-ui-dropdown-menu-sub]="isMenuInsideDropDown"
      [class.yue-ui-menu-sub]="!isMenuInsideDropDown"
    >
      <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
    </div>
  `,
  host: {
    '[class.yue-ui-menu-submenu]': 'true',
    '[class.yue-ui-menu-submenu-popup]': 'true',
    '[class.yue-ui-menu-submenu-placement-bottom]': "mode === 'horizontal'",
    '[class.yue-ui-menu-submenu-placement-right]': "mode === 'vertical' && position === 'right'",
    '[class.yue-ui-menu-submenu-placement-left]': "mode === 'vertical' && position === 'left'",
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  }
})
export class YueUiSubmenuNoneInlineChildComponent implements OnInit, OnChanges {

  @Input()
  public templateOutlet: TemplateRef<any> | null = null;

  @Input()
  public isMenuInsideDropDown = false;

  @Input()
  public mode: YueUiMenuMode = 'vertical';

  @Input()
  public position = 'right';

  @Input()
  public disabled = false;

  @Input()
  public open = false;

  @Output()
  public readonly subMenuMouseState = new EventEmitter<boolean>();

  public setMouseState(state: boolean): void {
    if (!this.disabled) {
      this.subMenuMouseState.next(state);
    }
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(_changes: SimpleChanges): void {
  }

}
