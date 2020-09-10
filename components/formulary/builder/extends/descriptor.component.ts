import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FieldStruct } from './../modifiers';



@Component({
  template: `
    <div class="field-descriptor-wrapper">
      <div *ngIf="invalidMetadata" class="invalid-message">
       <span [innerText]="message"></span>
      </div>
      <ng-container *ngIf="description && !invalidMetadata">
        <div class="field-description-inner">
          <div class="field-template">
            <yue-ui-smart-render [yueUiSmartRender]="description" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  styleUrls: [
    `./../styles/descriptor.component.less`
  ],
  host: {
    '[class.field-wrapper-descriptor]': `true`,
    '[class.has-description]': `description`,
    '[class.has-errors]': 'invalidMetadata'
  },
  animations: []
})
export class DescriptorComponent {

  public context: {[x: string]: any} = {};

  public description: FieldStruct['description'] | null = null;

  public invalidMetadata: {[x: string]: string} | null = null;

  public get message(): string {
    if (this.invalidMetadata) {
      return this.invalidMetadata[Object.keys(this.invalidMetadata).shift() || ``] || ``;
    }
    return ``;
  }

  constructor(public readonly cdr: ChangeDetectorRef) {}

}
