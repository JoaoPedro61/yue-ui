import { Component, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FieldStruct } from './../modifiers';



@Component({
  template: `
    <div class="field-label-wrapper">
      <div class="field-label-start">
        <div class="field-label-prepend">
          <ng-container *ngIf="prepend">
            <yue-ui-smart-render [yueUiSmartRender]="prepend" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
          </ng-container>
        </div>
        <div class="field-label">
          <ng-container *ngIf="label">
            <yue-ui-smart-render [yueUiSmartRender]="label" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
            <ng-container *ngIf="isRequired">
              <span class="required-indicator"></span>
            </ng-container>
          </ng-container>
        </div>
      </div>
      <div class="field-label-append">
        <ng-container *ngIf="append">
          <yue-ui-smart-render [yueUiSmartRender]="append" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: [
    `./../styles/label.component.less`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.field-wrapper-label]': `true`,
    '[class.has-errors]': `isInvalid`,
    '[class.is-required]': `isRequired`,
  }
})
export class LabelComponent implements AfterViewInit{

  public isRequired = false;

  public isInvalid = false;

  public label: FieldStruct['label'] | null = null;

  public prepend: FieldStruct['labelPrepend'] | null = null;

  public append: FieldStruct['labelAppend'] | null = null;

  public context: {[x: string]: any} = {};

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

}

