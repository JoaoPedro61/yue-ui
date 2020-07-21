import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { FieldStruct } from './../modifiers';



@Component({
  template: `
    <div class="field-label-wrapper">
      <div class="field-label-start">
        <div class="field-label-prepend">
          <ng-container *ngIf="prepend">
            <ng-container *yueUiStringTemplateRefRender="prepend">
              {{ prepend }}
            </ng-container>
          </ng-container>
        </div>
        <div class="field-label">
          <ng-container *ngIf="label">
            <ng-container *yueUiStringTemplateRefRender="label">
              {{ label }}
            </ng-container>
            <ng-container #lb>
            </ng-container>
            <ng-container *ngIf="isRequired">
              <span class="required-indicator"></span>
            </ng-container>
          </ng-container>
        </div>
      </div>
      <div class="field-label-append">
        <ng-container *ngIf="append">
          <ng-container *yueUiStringTemplateRefRender="append">
            {{ append }}
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
export class LabelComponent implements OnInit, AfterViewInit, OnDestroy {

  public isRequired = false;

  public isInvalid = false;

  public label: FieldStruct['label'] | null = null;

  public prepend: FieldStruct['labelPrepend'] | null = null;

  public append: FieldStruct['labelAppend'] | null = null;

  public context: {[x: string]: any} = {};

  public get isAComponent(): boolean {
    console.log(this);
    return false;
  }

  constructor(private readonly cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    console.log(this);
  }

  public ngOnDestroy(): void { }

}

