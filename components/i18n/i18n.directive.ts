import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, AfterViewInit, OnDestroy, ComponentRef, OnChanges, SimpleChanges } from '@angular/core';

import { YueUiI18nComponent } from './i18n.component';




@Directive({
  selector: '[yueUiI18n]'
})
export class YueUiI18nDirective implements AfterViewInit, OnChanges, OnDestroy {

  private componentRef_!: ComponentRef<YueUiI18nComponent>;

  private viewInitialized_ = false;

  @Input()
  public yueUiI18nParameters: Partial<any> = {};

  @Input()
  public yueUiI18n!: string;

  constructor(private readonly viewContainerRef_: ViewContainerRef, private readonly cfr: ComponentFactoryResolver) { }

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

  public ngAfterViewInit(): void {
    this.updateVisualization();
    this.viewInitialized_ = true;
  }

  public ngOnDestroy(): void {
    if (this.componentRef_) {
      this.componentRef_.destroy();
    }
  }

}
