import { Component, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FieldStruct } from './../modifiers';
import {Observable} from 'rxjs';



@Component({
  template: `
    <div class="field-label-wrapper">
      <div class="field-label-start">
        <div class="field-label-prepend">
          <ng-container *ngIf="prepend">
            <ng-container *yueUiStringTemplateRefRender="prepend" yueUiStringTemplateRefRenderContext="context">
              {{ prependIsAObservable ? ( ngSafeValue_prepend | async ) : prepend }}
            </ng-container>
          </ng-container>
        </div>
        <div class="field-label">
          <ng-container *ngIf="label">
            <ng-container *yueUiStringTemplateRefRender="label" yueUiStringTemplateRefRenderContext="context">
              {{ labelIsAObservable ? ( ngSafeValue_label | async ) : label }}
            </ng-container>
            <ng-container *ngIf="isRequired">
              <span class="required-indicator"></span>
            </ng-container>
          </ng-container>
        </div>
      </div>
      <div class="field-label-append">
        <ng-container *ngIf="append">
          <ng-container *yueUiStringTemplateRefRender="append" yueUiStringTemplateRefRenderContext="context">
            {{ appendIsAObservable ? ( ngSafeValue_append | async ) : append }}
          </ng-container>
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

  public get labelIsAObservable(): boolean {
    return this.label instanceof Observable;
  }

  public get ngSafeValue_label(): any {
    return this.label;
  }

  public prepend: FieldStruct['labelPrepend'] | null = null;

  public get prependIsAObservable(): boolean {
    return this.prepend instanceof Observable;
  }

  public get ngSafeValue_prepend(): any {
    return this.prepend;
  }

  public append: FieldStruct['labelAppend'] | null = null;

  public get appendIsAObservable(): boolean {
    return this.append instanceof Observable;
  }

  public get ngSafeValue_append(): any {
    return this.append;
  }

  public context: {[x: string]: any} = {};

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

}

