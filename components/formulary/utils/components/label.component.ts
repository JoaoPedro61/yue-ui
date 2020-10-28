import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Input, ChangeDetectorRef, ViewEncapsulation, OnChanges, OnDestroy } from '@angular/core';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-formulary-label',
  template: `
    <div class="yue-ui-formulary-field-label-wrapper">
      <div class="yue-ui-formulary-field-label-wrapper-start">
        <ng-container *ngIf="prepend">
          <div class="yue-ui-formulary-field-label-wrapper-start-prepend">
            <yue-ui-smart-render [yueUiSmartRender]="prepend" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
          </div>
        </ng-container>
        <div class="yue-ui-formulary-field-label-wrapper-start-content" [class.yue-ui-formulary-field-label-wrapper-start-content-invalid]="isInvalid">
          <label [attr.for]="to">
            <ng-container *ngIf="label">
              <yue-ui-smart-render [yueUiSmartRender]="label" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
            </ng-container>
            <ng-content></ng-content>
            <ng-container *ngIf="isRequired">
              <span class="yue-ui-formulary-field-label-wrapper-start-required-indicator"></span>
            </ng-container>
          </label>
        </div>
      </div>
      <ng-container *ngIf="append">
        <div class="yue-ui-formulary-field-label-wrapper-append">
          <yue-ui-smart-render [yueUiSmartRender]="append" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
        </div>
      </ng-container>
    </div>
  `,
  host: {
    '[class.yue-ui-formulary-field-label]': `true`,
    '[class.yue-ui-formulary-field-label-invalid]': `isInvalid`,
    '[class.yue-ui-formulary-label]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [],
  exportAs: 'yueUiFormularyLabelRef'
})
export class YueUiFormularyLabelComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input('yueUiFormularyLabelRequiredStyle')
  public required = false;

  public get isRequired(): boolean {
    if (typeof this.required === 'boolean') {
      return this.required;
    }
    return false;
  }

  @Input('yueUiFormularyLabelInvalidStyle')
  public invalid = false;

  @Input('yueUiFormularyLabelFor')
  public to!: string;

  public get isInvalid(): boolean {
    if (typeof this.invalid === 'boolean') {
      return this.invalid;
    }
    return false;
  }

  @Input('yueUiFormularyLabel')
  public label!: YueUiSmartRenderType;

  @Input('yueUiFormularyLabelPrepend')
  public prepend!: YueUiSmartRenderType;

  @Input('yueUiFormularyLabelAppend')
  public append!: YueUiSmartRenderType;

  @Input('yueUiFormularyLabelRenderContext')
  public context: Partial<any> = {};

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public update(): void {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  public ngOnInit(): void { }

  public ngOnChanges(): void { }

  public ngAfterViewInit(): void {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void { }

}
