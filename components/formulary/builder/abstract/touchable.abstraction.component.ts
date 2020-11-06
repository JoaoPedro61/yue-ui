import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { FieldAbstraction } from './abstraction';



@Component({
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      yueUiButton
      [disabled]="!enabled"
      [yueUiButtonType]="field.vstype"
      [yueUiButtonBlock]="true"
      [ngStyle]="styles"
      (click)="listeners('click', $event)"
      (mousedown)="listeners('mousedown', $event)"
      (mouseup)="listeners('mouseup', $event)"
      (mouseenter)="listeners('mouseenter', $event)"
      (mouseleave)="listeners('mouseleave', $event)"
      (focus)="listeners('focus', $event)"
      (blur)="listeners('blur', $event)"
      [attr.cdkFocusInitial]="useInitialFocus"
    >
      <yue-ui-smart-render
        [yueUiSmartRender]="placeholder"
        [yueUiSmartRenderContext]="contextRenderer"
      >
      </yue-ui-smart-render>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.touchable-abstraction]': 'true'
  },
  exportAs: 'touchableAbstractionRef',
})
export class TouchableAbstractionComponent extends FieldAbstraction {

  constructor() {
    super();
  }

}
