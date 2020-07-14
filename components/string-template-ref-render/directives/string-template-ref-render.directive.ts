import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  EmbeddedViewRef,
  SimpleChange,
  ViewContainerRef
} from '@angular/core';

import { Context } from './../utils/context';



@Directive({
  selector: '[yueUiStringTemplateRefRender]',
  exportAs: 'yueUiStringTemplateRefRenderRef'
})
export class YueUiStringTemplateRefRenderDirective<_T = unknown> implements OnChanges {

  /*
    Ivy render complement
   */
  public static ngTemplateContextGuard<T>(_dir: YueUiStringTemplateRefRenderDirective<T>, _ctx: any): _ctx is Context {
    return true;
  }

  private embeddedViewRef: EmbeddedViewRef<any> | null = null;

  private context = new Context();

  @Input()
  public yueUiStringTemplateRefRenderContext: any | null = null;

  @Input()
  public yueUiStringTemplateRefRender: any | TemplateRef<any> = null;

  private recreateView(): void {
    this.viewContainer.clear();
    const isTemplateRef = this.yueUiStringTemplateRefRender instanceof TemplateRef;
    const templateRef = (isTemplateRef ? this.yueUiStringTemplateRefRender : this.templateRef) as any;
    this.embeddedViewRef = this.viewContainer.createEmbeddedView(
      templateRef,
      isTemplateRef ? this.yueUiStringTemplateRefRenderContext : this.context
    );
  }

  private updateContext(): void {
    const isTemplateRef = this.yueUiStringTemplateRefRender instanceof TemplateRef;
    const newCtx = isTemplateRef ? this.yueUiStringTemplateRefRenderContext : this.context;
    const oldCtx = this.embeddedViewRef!.context as any;
    if (newCtx) {
      for (const propName of Object.keys(newCtx)) {
        oldCtx[propName] = newCtx[propName];
      }
    }
  }

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { yueUiStringTemplateRefRenderContext, yueUiStringTemplateRefRender } = changes;
    const shouldRecreateView = (): boolean => {
      let shouldOutletRecreate = false;
      if (yueUiStringTemplateRefRender) {
        if (yueUiStringTemplateRefRender.firstChange) {
          shouldOutletRecreate = true;
        } else {
          const isPreviousOutletTemplate = yueUiStringTemplateRefRender.previousValue instanceof TemplateRef;
          const isCurrentOutletTemplate = yueUiStringTemplateRefRender.currentValue instanceof TemplateRef;
          shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
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
