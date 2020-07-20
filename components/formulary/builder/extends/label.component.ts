import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, TemplateRef } from '@angular/core';



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

  public label = ``;

  public prepend: TemplateRef<any> | string | null = null;

  public append: TemplateRef<any> | string | null = null;

  public context: {[x: string]: any} = {};

  constructor(private readonly cdr: ChangeDetectorRef) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void { }

}

