import { Input, Output, EventEmitter, Component, ElementRef, Renderer2, RendererFactory2, OnChanges, OnDestroy, SimpleChanges, ChangeDetectorRef, ViewEncapsulation } from "@angular/core";

import { COLLAPSE_MOTION } from '@joaopedro61/yue-ui/core/animations';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `[yueUiCollapseCdk]`,
  template: `<ng-content></ng-content>`,
  host: {
    '[class.yue-ui-collapse-cdk]': 'true',
    '[class.yue-ui-collapse-cdk-opened]': 'open',
    '[class.yue-ui-collapse-cdk-closed]': '!open',
    '[attr.tabIndex]': '!open ? -1 : tabIndex === null ? null : tabIndex',

    '[@COLLAPSE_MOTION]': 'open',
  },
  styles: [`
    :host,
    .yue-ui-collapse-cdk {
      display: block;
      position: relative;
      overflow: hidden;
    }
  `],
  animations: [
    COLLAPSE_MOTION
  ]
})
export class YueUiCollapseCDKComponent implements OnChanges, OnDestroy {

  private _listnners: (() => void)[] = [];
  
  private _open = false;

  @Input(`yueUiCollapseCdk`)
  public get open(): boolean {
    return this._open;
  }

  @Input(`yueUiCollapseCdkTabIndex`)
  public tabIndex: number | string | null = null;

  @Input(`yueUiCollapseCdkOpen`)
  public set selfOpenAlias(v: boolean) {
    this.open = v;
  }

  @Input(`yueUiCollapseCdkTriggerOpenEl`)
  public triggerEl!: HTMLElement | ElementRef<any>;

  public set open(value: boolean) {
    if (this._open !== value) {
      this._open = value;
      this.openChange.emit(value);
    }
  }

  @Output('yueUiCollapseCdkOpenChange')
  public openChange: EventEmitter<boolean> = new EventEmitter();

  private _r2!: Renderer2;

  constructor(private readonly rf2: RendererFactory2, private readonly cdf: ChangeDetectorRef) {
    this._r2 = this.rf2.createRenderer(null, null);
  }

  private _removeListeners(): void {
    this._listnners.forEach(dispose => dispose());
  }

  private _assignEventToTriggerEl(): void {
    this._removeListeners();
    if (this.triggerEl) {
      let element!: HTMLElement;
      if (this.triggerEl instanceof ElementRef) {
        element = this.triggerEl.nativeElement;
      } else {
        element = this.triggerEl;
      }
      if (element instanceof HTMLElement) {
        const dispose = this._r2.listen(element, 'click', () => {
          this.toggle();
        });
        this._listnners.push(dispose);
      }
    }
  }

  public toggle(): void {
    this.setOpen(!this.open);
  }

  public setOpen(value: boolean): void {
    this.open = !!value;
    this.cdf.markForCheck();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { triggerEl } = changes;
    if (triggerEl) {
      this._assignEventToTriggerEl();
    }
  }

  public ngOnDestroy(): void {
    this._removeListeners();
    if (this._r2) {
      this._r2.destroy();
    }
  }

}
