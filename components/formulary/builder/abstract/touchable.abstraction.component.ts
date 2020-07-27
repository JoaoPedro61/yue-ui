import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FieldAbstraction } from './abstraction';



@Component({
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
    >
      <yue-ui-smart-render
        [yueUiSmartRender]="field.placeholder"
        [yueUiSmartRenderContext]="context"
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

  public get context(): { [x: string]: any } {
    return {
      model: this.model,
      abstractControl: this.abstractControl,
      field: this.field,
      formGroup: this.formGroup,
      formulary: this.formulary,
    };
  }

  public get styles(): { [x: string]: any } {
    return this.field.styles || {};
  }

  constructor() {
    super();
  }

}
