import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  EmbeddedViewRef,
  SimpleChange,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Type
} from '@angular/core';

import { Context } from '../utils/context';
import { YueUiStringTemplateRefRenderType } from '../utils/interfaces';



@Directive({
  selector: '[yueUiStringTemplateRefRender]',
  exportAs: 'yueUiStringTemplateRefRenderRef'
})
export class YueUiStringTemplateRefRenderDirective<_T = unknown> implements OnChanges {

  private embeddedViewRef: EmbeddedViewRef<any> | null = null;

  private context = new Context();

  private componentRef!: ComponentRef<Type<any>>;

  @Input()
  public yueUiStringTemplateRefRenderContext: any | null = null;

  @Input()
  public yueUiStringTemplateRefRender: YueUiStringTemplateRefRenderType = null;

  /*
    Ivy render complement
   */
  public static ngTemplateContextGuard<T>(_dir: YueUiStringTemplateRefRenderDirective<T>, _ctx: any): _ctx is Context {
    return true;
  }

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>, private cfr: ComponentFactoryResolver) {
  }
  
  private recreateView(): void {
    this.viewContainer.clear();
    const isTemplateRef = this.yueUiStringTemplateRefRender instanceof TemplateRef;
    const isComponent = this.yueUiStringTemplateRefRender instanceof Type;
    if (!isComponent) {
      const templateRef = (isTemplateRef ? this.yueUiStringTemplateRefRender : this.templateRef) as any;
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(
        templateRef,
        isTemplateRef ? this.yueUiStringTemplateRefRenderContext : this.context
      );
    } else {
      try {
        const ref: ComponentRef<Type<any>> = this.viewContainer.createComponent(this.cfr.resolveComponentFactory(this.yueUiStringTemplateRefRender as any));
        const ctx = isComponent ? this.yueUiStringTemplateRefRenderContext : this.context;
        if (ctx) {
          for (const prop in ctx) {
            if (prop.hasOwnProperty(prop)) {
              (ref.instance as Partial<any>)[prop] = (ctx as Partial<any>)[prop];
            }
          }
        }
        ref.changeDetectorRef.markForCheck();
        ref.changeDetectorRef.detectChanges();
        this.componentRef = ref;
      } catch(_e) {
        const templateRef = (isTemplateRef ? this.yueUiStringTemplateRefRender : this.templateRef) as any;
        this.embeddedViewRef = this.viewContainer.createEmbeddedView(
          templateRef,
          isTemplateRef ? this.yueUiStringTemplateRefRenderContext : this.context
        );
      }
    }
  }

  private updateContext(): void {
    const isTemplateRef = this.yueUiStringTemplateRefRender instanceof TemplateRef;
    const isComponent = this.yueUiStringTemplateRefRender instanceof Type;
    if (!isComponent) {
      const newCtx = isTemplateRef ? this.yueUiStringTemplateRefRenderContext : this.context;
      const oldCtx = this.embeddedViewRef!.context as any;
      if (newCtx) {
        for (const propName of Object.keys(newCtx)) {
          oldCtx[propName] = newCtx[propName];
        }
      }
    } else {
      const newCtx = isComponent ? this.yueUiStringTemplateRefRenderContext : this.context;
      const oldCtx = this.componentRef.instance as any;
      if (newCtx) {
        for (const propName of Object.keys(newCtx)) {
          oldCtx[propName] = newCtx[propName];
        }
      }
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiStringTemplateRefRenderContext, yueUiStringTemplateRefRender } = changes;
    const shouldRecreateView = (): boolean => {
      let shouldOutletRecreate = false;
      if (yueUiStringTemplateRefRender) {
        if (yueUiStringTemplateRefRender.firstChange) {
          shouldOutletRecreate = true;
        } else {
          const isPreviousOutletTemplate = yueUiStringTemplateRefRender.previousValue instanceof TemplateRef;
          const isCurrentOutletTemplate = yueUiStringTemplateRefRender.currentValue instanceof TemplateRef;
          const isPreviousOutletComponent = yueUiStringTemplateRefRender.previousValue instanceof Type;
          const isCurrentOutletComponent = yueUiStringTemplateRefRender.currentValue instanceof Type;
          shouldOutletRecreate = isPreviousOutletTemplate
            || isCurrentOutletTemplate
            || isPreviousOutletComponent
            || isCurrentOutletComponent;
        }
      }
      const hasContextShapeChanged = (ctxChange: SimpleChange): boolean => {
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
          for (const propName of currCtxKeys) {
            if (prevCtxKeys.indexOf(propName) === -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      };
      const shouldContextRecreate = yueUiStringTemplateRefRenderContext && hasContextShapeChanged(yueUiStringTemplateRefRenderContext);
      return shouldContextRecreate || shouldOutletRecreate;
    };

    if (yueUiStringTemplateRefRender) {
      this.context.$implicit = yueUiStringTemplateRefRender.currentValue;
    }

    const recreateView = shouldRecreateView();
    if (recreateView) {
      this.recreateView();
    } else {
      this.updateContext();
    }
  }

}
