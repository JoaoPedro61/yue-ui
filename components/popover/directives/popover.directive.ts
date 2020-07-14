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

import { BaseDirective, YueUiTooltipTrigger } from '@JoaoPedro61/yue-ui/tooltip';

import { YueUiPopoverComponent } from '../components/popover.component';



@Directive({
  selector: `[yueUiPopover]`,
  host: {
    '[class.yue-ui-popover-opened]': 'visible',
    '[class.yue-ui-popover-directive]': 'true',
  },
  exportAs: 'yueUiPopoverRef'
})
export class YueUiPopoverDirective extends BaseDirective {

  @Input('yueUiPopoverTitle')
  public specificTitle?: string | TemplateRef<any> | null;

  @Input('yueUiPopoverContent')
  public specificContent?: string | TemplateRef<any> | null;

  @Input('yueUiPopover')
  public directiveNameTitle?: string | TemplateRef<any> | null;

  @Input('yueUiPopoverTrigger')
  public specificTrigger: YueUiTooltipTrigger = 'click';

  @Input('yueUiPopoverPlacement')
  public specificPlacement = 'bottom';

  @Input('yueUiPopoverOrigin')
  public specificOrigin?: ElementRef<HTMLElement>;

  @Input('yueUiPopoverVisible')
  public specificVisible?: boolean;

  @Input('yueUiPopoverStyles')
  public specificOverlayStyle?: {[x: string]: any};

  // tslint:disable-next-line:no-output-rename
  @Output('yueUiPopoverVisibleChange')
  readonly specificVisibleChange = new EventEmitter<boolean>();

  public componentFactory: ComponentFactory<any> = this.resolver.resolveComponentFactory(YueUiPopoverComponent);

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
  ) {
    super(elementRef, hostView, resolver, renderer);
  }

}
