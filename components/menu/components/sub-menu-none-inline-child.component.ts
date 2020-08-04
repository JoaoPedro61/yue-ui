import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { YueUiMenuType } from './../utils/interfaces';



@Component({
  selector: 'yue-ui-submenu-none-inline-child',
  exportAs: 'yueUiSubMenuNoneInlineChildRef',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)'
  },
  preserveWhitespaces: false,
  styleUrls: [
    `./../styles/sub-menu-node-inline-child.component.less`,
  ],
})
export class YueUiSubMenuNoneInlineChildComponent {

  @Input()
  public isMenuInsideDropDown = false;

  @Input()
  public disabled = false;

  @Input()
  public paddingLeft: number | null = null;

  @Input()
  public open = false;

  @Input()
  public mode: YueUiMenuType = 'vertical';

  @Output()
  public readonly subMenuMouseState = new EventEmitter<boolean>();

  public setMouseState(state: boolean): void {
    if (!this.disabled) {
      this.subMenuMouseState.next(state);
    }
  }

}
