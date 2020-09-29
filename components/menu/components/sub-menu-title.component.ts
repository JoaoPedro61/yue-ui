import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { YueUiMenuType } from './../utils/interfaces';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-submenu-title',
  exportAs: 'yueUiSubMenuTitleRef',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.yue-ui-submenu-title]': 'true',
    '[style.paddingLeft.px]': 'paddingLeft',
    '(click)': 'clickTitle()',
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  },
  styles: [
    `
      :host, .yue-ui-submenu-title {
        display: block;
        position: relative;
      }
    `
  ]
})
export class YueUiSubMenuTitleComponent {

  @Input()
  public isMenuInsideDropDown = false;

  @Input()
  public disabled = false;

  @Input()
  public paddingLeft: number | null = null;

  @Input()
  public mode: YueUiMenuType = 'vertical';

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
