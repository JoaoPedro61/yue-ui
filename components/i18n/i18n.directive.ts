import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, AfterViewInit, OnDestroy, ComponentRef, OnChanges, SimpleChanges } from '@angular/core';

import { YueUiI18nComponent } from './i18n.component';



/**
 * Use this to have a translation update when the tokens change or
 * when the language has changed, thus updating the tokens will
 * work even if the component you are using has OnPush change detection
 *
 * @usageNotes
 * This will overwrite the content of the element in question
 * by creating the <yue-ui-i18n> </yue-ui-i18n> component
 *
 * ```html
 * <span [yueUiI18n]="'YOUR_TOKEN'" [yueUiI18nParameters]="{}"></span>
 * ```
 *
 * @export
 * @class YueUiI18nDirective
 * @implements {AfterViewInit}
 * @implements {OnDestroy}
 * @implements {OnChanges}
 */
@Directive({
  selector: '[yueUiI18n]'
})
export class YueUiI18nDirective implements AfterViewInit, OnChanges, OnDestroy {

  /**
   * Component reference
   *
   * @ignore
   * @internal
   *
   * @private
   * @type {ComponentRef<YueUiI18nComponent>}
   * @memberof YueUiI18nDirective
   */
  private componentRef_!: ComponentRef<YueUiI18nComponent>;

  /**
   * Flag to check if the view was initialized
   *
   * @ignore
   * @internal
   *
   * @private
   * @memberof YueUiI18nDirective
   */
  private viewInitialized_ = false;

  /**
   * Parameter's input
   *
   * @memberof YueUiI18nComponent
   */
  @Input()
  public yueUiI18nParameters: Partial<any> = {};

  /**
   * Token's input
   *
   * @memberof YueUiI18nDirective
   */
  @Input()
  public yueUiI18n!: string;

  /**
   * Creates an instance of YueUiI18nDirective.
   *
   * @param {ViewContainerRef} viewContainerRef_ ViewContainerRef to create a new components
   * @param {ComponentFactoryResolver} cfr ComponentFactoryResolver to resolve component's dependencies
   * @memberof YueUiI18nDirective
   */
  constructor(private readonly viewContainerRef_: ViewContainerRef, private readonly cfr: ComponentFactoryResolver) { }

  /**
   * Update the sub component with the new token
   *
   * @ignore
   * @internal
   *
   * @private
   * @memberof YueUiI18nDirective
   */
  private updateVisualization(): void {
    if (!this.componentRef_) {
      this.componentRef_ = this.viewContainerRef_.createComponent(this.cfr.resolveComponentFactory(YueUiI18nComponent));
    }
    this.componentRef_.instance.yueUiI18nToken = this.yueUiI18n;
    this.componentRef_.instance.yueUiI18nParameters = this.yueUiI18nParameters;
    this.componentRef_.changeDetectorRef.markForCheck();
    this.componentRef_.changeDetectorRef.detectChanges();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.viewInitialized_) {
      const { yueUiI18nToken, yueUiI18nParameters } = changes;
      if ( yueUiI18nToken || yueUiI18nParameters ) {
        this.updateVisualization();
      }
    }
  }

  /**
   * @ignore
   * @internal
   *
   * @memberof YueUiI18nDirective
   */
  public ngAfterViewInit(): void {
    this.updateVisualization();
    this.viewInitialized_ = true;
  }

  /**
   * @ignore
   * @internal
   *
   * @memberof YueUiI18nDirective
   */
  public ngOnDestroy(): void {
    if (this.componentRef_) {
      this.componentRef_.destroy();
    }
  }

}
