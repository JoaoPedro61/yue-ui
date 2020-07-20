import { Component, ChangeDetectionStrategy, TemplateRef } from '@angular/core';



@Component({
  template: `
    <div class="field-descriptor-wrapper">
      <ng-container *ngIf="description">
        <div class="field-description-inner">
          <div class="field-template">
            <ng-container *yueUiStringTemplateRefRender="description">
              {{ description }}
            </ng-container>
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
  }
})
export class DescriptorComponent {

  public description: TemplateRef<any> | string | null = null;

}
