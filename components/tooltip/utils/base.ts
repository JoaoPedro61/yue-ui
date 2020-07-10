import {
  ChangeDetectorRef,
  ElementRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2,
  TemplateRef,
  EventEmitter,
  ViewChild,
  Directive,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ComponentFactory,
  SimpleChanges
} from '@angular/core';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';

import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import {
  POSITION_MAP, getPlacementName, DEFAULT_TOOLTIP_POSITIONS
} from '@JoaoPedro61/yue-ui/overlay';

import { YueUiTooltipComponent } from './../components/tooltip.component';

import { YueUiTooltipTrigger } from './interfaces';



@Directive()
export class BaseDirective implements OnChanges, OnDestroy, AfterViewInit  {

  protected directiveNameTitle?: TemplateRef<any> | string | null;

  protected specificTitle?: TemplateRef<any> | string | null;

  protected directiveNameContent?: TemplateRef<any> | string | null;

  protected specificContent?: TemplateRef<any> | string | null;

  protected specificTrigger?: YueUiTooltipTrigger;

  protected specificPlacement?: string;

  protected specificOrigin?: ElementRef<HTMLElement>;

  protected specificVisible?: boolean;

  protected specificMouseEnterDelay?: number;

  protected specificMouseLeaveDelay?: number;

  protected specificOverlayClassName?: string;

  protected specificOverlayStyle?: {[x: string]: any};

  protected specificVisibleChange = new EventEmitter<boolean>();

  protected componentFactory!: ComponentFactory<YueUiTooltipComponent>;

  protected needProxyProperties = [];

  protected get title(): TemplateRef<any> | string | null {
    return this.specificTitle || this.directiveNameTitle || null;
  }

  protected get content(): TemplateRef<any> | string | null {
    return this.specificContent || this.directiveNameContent || null;
  }

  protected get placement(): string {
    return this.specificPlacement || 'rightBottom';
  }

  protected get trigger(): YueUiTooltipTrigger {
    return this.specificTrigger || 'hover';
  }

  protected get isVisible(): boolean {
    return this.specificVisible || false;
  }

  protected get mouseEnterDelay(): number {
    return this.specificMouseEnterDelay || 0.15;
  }

  protected get mouseLeaveDelay(): number {
    return this.specificMouseLeaveDelay || 0.1;
  }

  protected get overlayClassName(): string | null {
    return this.specificOverlayClassName || null;
  }

  protected get overlayStyle(): {[x: string]: any} | null {
    return this.specificOverlayStyle || null;
  }

  visible = false;

  component?: YueUiTooltipComponent;

  protected readonly destroy$ = new Subject<void>();

  protected readonly triggerDisposables: Array<() => void> = [];

  private delayTimer?: number;

  constructor(
    public elementRef: ElementRef,
    protected hostView: ViewContainerRef,
    protected resolver: ComponentFactoryResolver,
    protected renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { yueUiTrigger, specificTrigger } = changes;
    const trigger = specificTrigger || yueUiTrigger;
    if (trigger && !trigger.isFirstChange()) {
      this.registerTriggers();
    }
    if (this.component) {
      this.updateChangedProperties(changes);
    }
  }

  ngAfterViewInit(): void {
    this.createComponent();
    this.registerTriggers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    // Clear toggling timer. Issue #3875 #4317 #4386
    this.clearTogglingTimer();
    this.removeTriggerListeners();
  }

  show(): void {
    this.component?.show();
  }

  hide(): void {
    this.component?.hide();
  }

  /**
   * Force the component to update its position.
   */
  updatePosition(): void {
    if (this.component) {
      this.component.updatePosition();
    }
  }

  /**
   * Create a dynamic tooltip component. This method can be override.
   */
  protected createComponent(): void {
    const componentRef = this.hostView.createComponent(this.componentFactory);

    this.component = componentRef.instance;

    // Remove the component's DOM because it should be in the overlay container.
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), componentRef.location.nativeElement);
    this.component.setOverlayOrigin({ elementRef: this.specificOrigin || this.elementRef });

    this.updateChangedProperties(this.needProxyProperties);

    this.component.visibleChange.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((visible: boolean) => {
      this.visible = visible;
      this.specificVisibleChange.emit(visible);
    });
  }

  protected registerTriggers(): void {
    // When the method gets invoked, all properties has been synced to the dynamic component.
    // After removing the old API, we can just check the directive's own `yueUiTrigger`.
    const el = this.elementRef.nativeElement;
    const trigger = this.trigger;

    this.removeTriggerListeners();    

    if (trigger === 'hover') {
      let overlayElement: HTMLElement;
      this.triggerDisposables.push(
        this.renderer.listen(el, 'mouseenter', () => {
          this.delayEnterLeave(true, true, this.mouseEnterDelay);
        })
      );
      this.triggerDisposables.push(
        this.renderer.listen(el, 'mouseleave', () => {
          this.delayEnterLeave(true, false, this.mouseLeaveDelay);
          if (this.component?.overlay.overlayRef && !overlayElement) {
            overlayElement = this.component.overlay.overlayRef.overlayElement;
            this.triggerDisposables.push(
              this.renderer.listen(overlayElement, 'mouseenter', () => {
                this.delayEnterLeave(false, true);
              })
            );
            this.triggerDisposables.push(
              this.renderer.listen(overlayElement, 'mouseleave', () => {
                this.delayEnterLeave(false, false);
              })
            );
          }
        })
      );
    } else if (trigger === 'focus') {
      this.triggerDisposables.push(this.renderer.listen(el, 'focus', () => this.show()));
      this.triggerDisposables.push(this.renderer.listen(el, 'blur', () => this.hide()));
    } else if (trigger === 'click') {
      this.triggerDisposables.push(
        this.renderer.listen(el, 'click', e => {
          e.preventDefault();
          this.show();
        })
      );
    } // Else do nothing because user wants to control the visibility programmatically.
  }

  updatePropertiesByChanges(changes: SimpleChanges): void {
    const properties = {
      specificTitle: ['title', this.title],

      specificContent: ['content', this.content],

      specificTrigger: ['trigger', this.trigger],

      specificPlacement: ['placement', this.placement],

      specificVisible: ['isVisible', this.isVisible],

      specificMouseEnterDelay: ['mouseEnterDelay', this.mouseEnterDelay],

      specificMouseLeaveDelay: ['mouseLeaveDelay', this.mouseLeaveDelay],

      specificOverlayClassName: ['overlayClassName', this.overlayClassName],

      specificOverlayStyle: ['overlayStyle', this.overlayStyle],
    };

    const keys = Object.keys(changes);
    keys.forEach((property: any) => {
      // @ts-ignore
      if (properties[property]) {
        // @ts-ignore
        const [name, value] = properties[property];
        this.updateComponentValue(name, value);
      }
    });
  }

  updatePropertiesByArray(): void {
    this.updateComponentValue('title', this.title);
    this.updateComponentValue('content', this.content);
    this.updateComponentValue('placement', this.placement);
    this.updateComponentValue('trigger', this.trigger);
    this.updateComponentValue('isVisible', this.isVisible);
    this.updateComponentValue('mouseEnterDelay', this.mouseEnterDelay);
    this.updateComponentValue('mouseLeaveDelay', this.mouseLeaveDelay);
    this.updateComponentValue('overlayClassName', this.overlayClassName);
    this.updateComponentValue('overlayStyle', this.overlayStyle);
  }
  /**
   * Sync changed properties to the component and trigger change detection in that component.
   */
  protected updateChangedProperties(propertiesOrChanges: string[] | SimpleChanges): void {
    const isArray = Array.isArray(propertiesOrChanges);
    const keys = isArray ? (propertiesOrChanges as string[]) : Object.keys(propertiesOrChanges);

    keys.forEach((property: any) => {
      if ((this.needProxyProperties as any).indexOf(property) !== -1) {
        // @ts-ignore
        this.updateComponentValue(property, this[property]);
      }
    });
    if (isArray) {
      this.updatePropertiesByArray();
    } else {
      this.updatePropertiesByChanges(propertiesOrChanges as SimpleChanges);
    }
    this.component?.updateByDirective();
  }

  private updateComponentValue(key: string, value: any): void {
    if (typeof value !== 'undefined') {
      // @ts-ignore
      this.component[key] = value;
    }
  }

  private delayEnterLeave(isOrigin: boolean, isEnter: boolean, delay: number = -1): void {
    if (this.delayTimer) {
      this.clearTogglingTimer();
    } else if (delay > 0) {
      this.delayTimer = setTimeout(() => {
        this.delayTimer = undefined;
        isEnter ? this.show() : this.hide();
      }, delay * 1000);
    } else {
      isEnter && isOrigin ? this.show() : this.hide();
    }
  }

  private removeTriggerListeners(): void {
    this.triggerDisposables.forEach(dispose => dispose());
    this.triggerDisposables.length = 0;
  }

  private clearTogglingTimer(): void {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = undefined;
    }
  }

}

@Directive()
export abstract class BaseComponent {

  @ViewChild('overlay', { static: false })
  public overlay!: CdkConnectedOverlay;

  public title: TemplateRef<any> | string | null = null;

  public content: TemplateRef<any> | string | null = null;

  public set placement(value: string) {
    if (value !== this.preferredPlacement) {
      this.preferredPlacement = value;
      this._positions = [
        POSITION_MAP[this.preferredPlacement],
        ...this._positions
      ];
    }
  }

  public get placement(): string {
    return this.preferredPlacement;
  }

  protected _trigger: YueUiTooltipTrigger = 'hover';

  public set trigger(value: YueUiTooltipTrigger) {
    this._trigger = value;
    this._hasBackdrop = this._trigger === 'click';
  }

  public get trigger(): YueUiTooltipTrigger {
    return this._trigger;
  }

  public _visible = false;

  public set isVisible(value: boolean) {
    const visible = !!value;
    if (this._visible !== visible) {
      this._visible = visible;
      this.visibleChange.next(visible);
    }
  }

  public get isVisible(): boolean {
    return this._visible;
  }

  public mouseEnterDelay?: number;

  public mouseLeaveDelay?: number;

  public overlayClassName!: any;

  public overlayStyle: {[x: string]: any} = {};
  
  public visibleChange = new Subject<boolean>();

  origin?: CdkOverlayOrigin;

  preferredPlacement = 'top';

  _classMap: {[x: string]: any} = {};

  _hasBackdrop = false;

  _prefix = 'yue-ui-tooltip-placement';

  _positions: ConnectionPositionPair[] = [
    ...DEFAULT_TOOLTIP_POSITIONS
  ];

  constructor(public cdr: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.visibleChange.complete();
  }

  show(): void {
    if (this.isVisible) {
      return void 0;
    }
    if (!this.isEmpty()) {
      this.isVisible = true;
      this.visibleChange.next(true);
      this.cdr.detectChanges();
    }
  }

  hide(): void {
    if (!this.isVisible) {
      return void 0;
    }

    this.isVisible = false;
    this.visibleChange.next(false);
    this.cdr.detectChanges();
  }

  updateByDirective(): void {
    this.setClassMap();
    this.cdr.detectChanges();

    Promise.resolve().then(() => {
      this.updatePosition();
      this.updateVisibilityByTitle();
    });
  }

  /**
   * Force the component to update its position.
   */
  updatePosition(): void {
    if (this.origin && this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.preferredPlacement = getPlacementName(position)!;
    this.setClassMap();
    this.cdr.detectChanges();
  }

  setClassMap(): void {
    this._classMap = {
      [this.overlayClassName]: true,
      [`${this._prefix}-${this.preferredPlacement}`]: true
    };
  }

  setOverlayOrigin(origin: CdkOverlayOrigin): void {
    this.origin = origin;
    this.cdr.markForCheck();
  }

  /**
   * Hide the component while the content is empty.
   */
  private updateVisibilityByTitle(): void {
    if (this.isEmpty()) {
      this.hide();
    }
  }

  /**
   * Empty component cannot be opened.
   */
  protected abstract isEmpty(): boolean;

}
