import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { YueUiMenuMode } from './../utils/types';






@Component({
  selector: '[yue-ui-submenu-title]',
  exportAs: 'yueUiSubmenuTitleRef',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i yueUiIcon [yueUiIconType]="icon" *ngIf="icon"></i>
    <yue-ui-smart-render [yueUiSmartRender]="label"></yue-ui-smart-render>
    <ng-content></ng-content>
    <span *ngIf="isMenuInsideDropDown; else notDropdownTpl" class="yue-ui-dropdown-menu-submenu-arrow">
      <i yueUiIcon yueUiIconType="right" class="yue-ui-dropdown-menu-submenu-arrow-icon"></i>
    </span>
    <ng-template #notDropdownTpl>
      <i class="yue-ui-menu-submenu-arrow"></i>
    </ng-template>
  `,
  host: {
    '[class.yue-ui-dropdown-menu-submenu-title]': 'isMenuInsideDropDown',
    '[class.yue-ui-menu-submenu-title]': '!isMenuInsideDropDown',
    '[class.yue-ui-menu-submenu-title-disabled]': 'disabled',
    '[class.yue-ui-menu-submenu-title-selected]': 'selected',
    '[style.paddingLeft.px]': 'paddingLeft',
    '(click)': 'clickTitle()',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  }
})
export class YueUiSubMenuTitleComponent {

  @Input()
  public icon: string | null = null;

  @Input()
  public label: string | TemplateRef<void> | null = null;

  @Input()
  public isMenuInsideDropDown = false;

  @Input()
  public disabled = false;

  @Input()
  public selected = false;

  @Input()
  public paddingLeft: number | null = null;

  @Input()
  public mode: YueUiMenuMode = 'vertical';

  @Output()
  public readonly toggleSubMenu = new EventEmitter();

  @Output()
  public readonly subMenuMouseState = new EventEmitter<boolean>();

  public setMouseState(state: boolean): void {
    if (!this.disabled) {
      this.subMenuMouseState.next(state);
    }
  }

  public clickTitle(): void {
    if (this.mode === 'inline' && !this.disabled) {
      this.toggleSubMenu.emit();
    }
  }

}
