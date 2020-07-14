import { Directive, TemplateRef } from '@angular/core';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { YueUiTooltipComponent } from './../components/tooltip.component';

import { BaseDirective } from './../utils/base';
import { YueUiTooltipTrigger } from './../utils/interfaces';


@Directive({
  selector: `[yueUiTooltip]`,
  host: {
    '[class.yue-ui-tooltip-opened]': 'visible',
    '[class.yue-ui-tooltip-directive]': 'true',
  },
  exportAs: 'yueUiTooltipRef'
})
export class YueUiTooltipDirective extends BaseDirective {

  @Input('yueUiTooltipTitle')
  public specificTitle?: string | TemplateRef<any> | null;

  @Input('yueUiTooltip')
  public directiveNameTitle?: string | TemplateRef<any> | null;

  @Input('yueUiTooltipTrigger')
  public specificTrigger?: YueUiTooltipTrigger;

  @Input('yueUiTooltipPlacement')
  public specificPlacement?: string;

  @Input('yueUiTooltipOrigin')
  public specificOrigin?: ElementRef<HTMLElement>;

  @Input('yueUiTooltipVisible')
  public specificVisible?: boolean;

  // tslint:disable-next-line:no-output-rename
  @Output('yueUiTooltipVisibleChange')
  readonly specificVisibleChange = new EventEmitter<boolean>();

  public componentFactory: ComponentFactory<YueUiTooltipComponent> = this.resolver.resolveComponentFactory(YueUiTooltipComponent);

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
  ) {
    super(elementRef, hostView, resolver, renderer);
  }

}
