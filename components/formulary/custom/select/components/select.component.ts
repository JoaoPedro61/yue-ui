import { ElementRef, Renderer2, RendererFactory2, AfterContentChecked } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { removeAccents, elementDimentions, equals, hash } from '@joaopedro61/yue-ui/core/utils';

import { YueUiSelectOptionComponent } from './select-option.component';

import { YueUiSelectSearchChange, YueUiSelectMode, YueUiSelectProperties, Placeholder } from './../utils/interfaces';
import { ConnectedPosition, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { DEFAULT_MENTION_BOTTOM_POSITIONS, YueUiOverlayDirective } from '@joaopedro61/yue-ui/overlay';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { UP_ARROW, DOWN_ARROW, ENTER, SPACE, TAB, ESCAPE } from '@angular/cdk/keycodes';



type YueUiSafeValue = any;



@Component({
  selector: 'yue-ui-select',
  template: `
    <div class="input-select-wrapper" [class.single]="mode === 'single'" [class.multiple]="mode === 'multiple'"
      [class.disabled]="disabled" [class.mouseovering]="mouseovering" [class.showclear]="mouseovering && hasValue">
      <div class="input-select" cdkOverlayOrigin #originOverlay="cdkOverlayOrigin" (mouseover)="mouseovering = true;" (mouseout)="mouseovering = false;">
        <div class="input-labels-value" #optionsSelecteds (click)="(mode === 'single' && focus());">
          <ng-container *ngIf="selections && selections.length && (mode === 'single' ? !isVisible : true)">
            <ng-container *ngFor="let option of selections; let index = index">
              <span class="option-selection">
                <yue-ui-smart-render
                  [yueUiSmartRender]="option.label"
                  [yueUiSmartRenderContext]="option.value"
                >
                </yue-ui-smart-render>
                <ng-container *ngIf="mode === 'multiple' && !disabled">
                  <span class="handler-remover" (click)="selectOption(option.value, option.component)">
                    <svg width="15" height="15" viewBox="0 0 24 24" focusable="false" role="presentation">
                      <path
                        d="M13 11V3.993A.997.997 0 0 0 12 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 0 0 3 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0 0 21 12c0-.556-.445-1-.993-1H13z"
                        fill="currentColor" fill-rule="evenodd"></path>
                    </svg>
                  </span>
                </ng-container>
              </span>
            </ng-container>
          </ng-container>
        </div>
        <div class="input-clear">
          <ng-container *ngIf="yueUiSelectAllowClear && !isVisible && !disabled && hasValue">
            <span class="input-clear-wrapper">
              <span class="input-clear-handler" (click)="clear();">
                <svg width="12" height="12" viewBox="0 0 24 24" focusable="false" role="presentation">
                  <path
                    d="M13 11V3.993A.997.997 0 0 0 12 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 0 0 3 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0 0 21 12c0-.556-.445-1-.993-1H13z"
                    fill="currentColor" fill-rule="evenodd"></path>
                </svg>
              </span>
            </span>
          </ng-container>
        </div>
        <textarea [id]="yueUiSelectId" #inputFake class="input-select-fake" [class.caret-visible]="isVisible" autocomplete="off" role="combobox" aria-autocomplete="list"
          aria-haspopup="true" aria-expanded="true" wrap="off" aria-busy="false" (keyup)="researh($event)" (click)="focus();"
          (keydown)="preventKeydown($event);" [value]="searchValue" [placeholder]="allowShowPlaceholder ? (placeholderIsAObservable ? (ngSafeValue_yueUiSelectPlaceholder | async) : ngSafeValue_yueUiSelectPlaceholder) : equivalencePlaceholder"
          [disabled]="disabled" [attr.cdkFocusInitial]="yueUiSelectInitialFocus"></textarea>
        <span class="icon-drop-menu"></span>
      </div>
    </div>
    <ng-template
      #overlay="cdkConnectedOverlayRef"
      cdkConnectedOverlay
      yueUiConnectedOverlay
      [cdkConnectedOverlayOrigin]="originOverlay"
      [cdkConnectedOverlayOpen]="isVisible"
      [cdkConnectedOverlayHasBackdrop]="hasBackdrop"
      [cdkConnectedOverlayPositions]="positions"
      (backdropClick)="hide()"
      (detach)="hide()"
    >
      <div class="input-select--overlay-wrapper--" [style.width.%]="100">
        <cdk-virtual-scroll-viewport
          [itemSize]="itemSize"
          [maxBufferPx]="itemSize * maxItemLength"
          [minBufferPx]="itemSize * maxItemLength"
          (scrolledIndexChange)="onScrolledIndexChange($event)"
          [style.height.px]="listLength * itemSize"
          [style.width.%]="100"
          [style.max-height.px]="itemSize * maxItemLength"
        >
          <ng-template
            cdkVirtualFor
            [cdkVirtualForOf]="listOfYueUiSelectOptionComponent"
            [cdkVirtualForTemplateCacheSize]="0"
            let-item
            let-index="index"
          >
            <yue-ui-select-option-renderer
              [yueUiSelectOptionRendererOption]="item"
              [yueUiSelectOptionRendererOptionIndex]="index"
              [yueUiSelectOptionRendererOptionActivated]="activatedValue"
            ></yue-ui-select-option-renderer>
          </ng-template>
        </cdk-virtual-scroll-viewport>
      </div>
    </ng-template>
  `,
  styleUrls: [
    './../styles/select.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YueUiSelectComponent),
      multi: true,
    }
  ],
})
export class YueUiSelectComponent implements OnInit, ControlValueAccessor, AfterViewInit, AfterContentChecked {

  @ViewChild('overlay', { static: false })
  public overlay!: YueUiOverlayDirective;

  @ViewChild('originOverlay', { static: false })
  public origin!: CdkOverlayOrigin;

  @ViewChild('optionsSelecteds', { read: ElementRef, static: false })
  private optionsSelectedsWrapper!: ElementRef<HTMLDivElement>;

  @ViewChild('inputFake', { read: ElementRef, static: false })
  private inputFake!: ElementRef<HTMLTextAreaElement>;

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  private cdkVirtualScrollViewport!: CdkVirtualScrollViewport;

  public itemSize = 32;

  public maxItemLength = 8;

  public scrolledIndex = 0;

  public get equivalencePlaceholder(): string {
    if (this.hasValue && this.mode === `single` && this.isVisible) {
      const first = (this.selections as any).concat().shift();
      if (first) {
        if (typeof first.label === `string`) {
          return first.label;
        }
      }
    }
    return ``;
  }

  public listOfYueUiSelectOptionComponent: YueUiSelectOptionComponent[] = [];

  private _renderer!: Renderer2;

  private _val: any = null;

  private _visible = false;

  private _hasBackdrop = true;

  private _activatedValue: any = null;

  private _positions = [
    ...DEFAULT_MENTION_BOTTOM_POSITIONS
  ];

  public get activatedValue(): any {
    return this._activatedValue;
  }

  public get listLength(): number {
    if (this.listOfYueUiSelectOptionComponent) {
      return this.listOfYueUiSelectOptionComponent.length;
    }
    return 0;
  }

  public get isVisible(): boolean {
    return this._visible;
  }

  public set isVisible(value: boolean) {
    this._visible = value;
  }

  public get hasBackdrop(): boolean {
    return this._hasBackdrop;
  }

  public get positions(): ConnectedPosition[] {
    return this._positions;
  }

  public set value(v: any) {
    this._val = v;
    this.onChange(this._val);
    this.onTouch();
  }

  public get value(): any {
    return this._val;
  }

  private _disabled: boolean = false;

  public set disabled(v: boolean) {
    this._disabled = v;
    this.cdr.detectChanges();
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  public get mode(): YueUiSelectMode {
    if (this.yueUiSelectMode) {
      return this.yueUiSelectMode;
    }
    return 'single';
  }

  public get hasValue(): boolean {
    if (this.selections.length) {
      return true;
    }
    return false;
  }

  public get searchValue(): string {
    if (this.selections.length) {
      return ``;
    }
    return this.searhBy.staticValue;
  }

  public get allowShowPlaceholder(): boolean {
    if (this.selections.length) {
      return false;
    }
    return true;
  }

  public get placeholderIsAObservable(): boolean {
    return this.yueUiSelectPlaceholder instanceof Observable;
  }

  public get ngSafeValue_yueUiSelectPlaceholder(): any {
    return this.yueUiSelectPlaceholder;
  }

  public mouseovering = false;

  public selections: YueUiSafeValue = [];

  public timer: YueUiSafeValue = null;

  private searhBy: YueUiSafeValue = {
    staticValue: '',
    value: ''
  };

  @Input()
  public yueUiSelectId = hash();

  @Input()
  public yueUiSelectAllowSearch = true;

  @Input()
  public yueUiSelectInitialFocus = true;

  @Input()
  public yueUiSelectAllowClear = true;

  @Input()
  public yueUiSelectAllowEmpty = true;

  @Input()
  public yueUiSelectDebounceOnType = 250;

  @Input()
  public yueUiSelectForceUpdates = true;

  @Input()
  public yueUiSelectPropertyLabel: YueUiSelectProperties['label'] = 'label';

  @Input()
  public yueUiSelectPropertyValue: YueUiSelectProperties['value'] = 'value';

  @Input()
  public yueUiSelectMode: YueUiSelectMode = 'single';

  @Input()
  public yueUiSelectPlaceholder: Placeholder = '';

  @Output()
  public yueUiSelectOnSearchChange: EventEmitter<YueUiSelectSearchChange> = new EventEmitter<YueUiSelectSearchChange>();

  @Output()
  public yueUiSelectOnPanelOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public yueUiSelectOnScrollToBottom: EventEmitter<void> = new EventEmitter<void>();

  public onChange: (newValue: any) => void = () => { };

  public onTouch: () => void = () => { };

  constructor(private readonly cdr: ChangeDetectorRef, private readonly rf2: RendererFactory2) {
    this._renderer = this.rf2.createRenderer(null, null);
  }

  public focusToEl(): void {
    if (!this.disabled) {
      if (this.inputFake && this.inputFake.nativeElement) {
        this.inputFake.nativeElement.focus();
      }
    }
  }
  
  public onKeyDown(e: KeyboardEvent): void {
    if (this.disabled) {
      return void 0;
    }
    const activatedIndex = this.listOfYueUiSelectOptionComponent.findIndex(item => equals(item.value, this._activatedValue)) || 0;
    switch (e.keyCode) {
      case UP_ARROW:
        e.preventDefault();
        if (this.isVisible) {
          const preIndex = activatedIndex > 0 ? activatedIndex - 1 : this.listOfYueUiSelectOptionComponent.length - 1;
          this._activatedValue = this.listOfYueUiSelectOptionComponent[preIndex].value;
          const component = this.listOfYueUiSelectOptionComponent[activatedIndex];
          if (component) {
            if (equals(component.value, this._activatedValue)) {
              component.cdr.detectChanges();
            }
          }
        }
        break;
      case DOWN_ARROW:
        e.preventDefault();
        if (this.isVisible) {
          const nextIndex = activatedIndex < this.listOfYueUiSelectOptionComponent.length - 1 ? activatedIndex + 1 : 0;
          this._activatedValue = this.listOfYueUiSelectOptionComponent[nextIndex].value;
          const component = this.listOfYueUiSelectOptionComponent[activatedIndex];
          if (component) {
            if (equals(component.value, this._activatedValue)) {
              component.cdr.detectChanges();
            }
          }
        } else {
          this.show();
        }
        break;
      case ENTER:
        e.preventDefault();
        if (this.isVisible) {
          if (this._activatedValue) {
            const component = this.listOfYueUiSelectOptionComponent[activatedIndex];
            if (component) {
              if (equals(component.value, this._activatedValue)) {
                component.selectThis();
              }
            }
          }
        } else {
          this.show();
        }
        break;
      case SPACE:
        if (!this.isVisible) {
          this.show();
          e.preventDefault();
        }
        break;
      case TAB:
        this.hide();
        break;
      case ESCAPE:
        this.hide();
        break;
      default:
        if (!this.isVisible) {
          this.hide();
        }
    }
    this.scrollToActivatedValue();
  }

  public optionIsActivated(value: any): boolean {
    return equals(value, this._activatedValue);
  }

  public valueIsSelected(value: any): boolean {
    if (this.mode === `single`) {
      return equals(this.value, value);
    } else if (this.mode === `multiple`) {
      let isSelected = false;
      const currentVal = this.value;
      if (Array.isArray(currentVal)) {
        for (let i = 0, l = currentVal.length; i < l; i++) {
          if (equals(currentVal[i], value)) {
            isSelected = true;
            break;
          }
        }
      }
      return isSelected;
    }
    return false;
  }

  public selectOption(_value: any, component: YueUiSelectOptionComponent): void {
    if (this.mode === `single`) {
      if (equals(this.value, component.value) && this.yueUiSelectAllowEmpty) {
        this.selections = [];
        this._activatedValue = null;
        this.value = null;
      } else {
        this.selections = [
          {
            label: component.label,
            value: component.value,
            component,
          },
        ];
        this._activatedValue = component.value;
        this.value = component.value;
        this.isVisible = false;
      }
    } else if (this.mode === `multiple`) {
      let matchIndex = 0;
      let matchExist = false;
      
      if (this.selections && Array.isArray(this.selections) && this.selections.length > 0) {
        for (let i = 0, l = this.selections.length; i < l; i++) {
          if (equals(this.selections[i].value, component.value)) {
            matchExist = true;
            matchIndex = i;
            break;
          }
        }
      }
      if (!Array.isArray(this.selections)) {
        this.selections = [];
      }
      if (matchExist) {
        if (this.selections[matchIndex]) {
          (this.selections as any[]).splice(matchIndex, 1);
          this._activatedValue = (this.selections[this.selections - 1] || {}).value || null;
          if (!this.selections.length) {
            this.value = null;
          } else {
            this.value = (this.selections as any[]).map((i) => i.value);
          }
        }
      } else {
        (this.selections as any[]).push({
          label: component.label,
          value: component.value,
          component,
        });
        this._activatedValue = component.value;
        this.value = (this.selections as any[]).map((i) => i.value);
      }
    }
    this.cdr.markForCheck();
    if (component) {
      component.cdr.markForCheck();
    }
  }

  public scrollToActivatedValue(): void {
    if (this.isVisible) {
      const index = this.listOfYueUiSelectOptionComponent.findIndex(item => equals(item.value, this._activatedValue)) || 0;
      if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
        this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
      }
    }
  }

  public onScrolledIndexChange(index: number): void {
    this.scrolledIndex = index;
    if (index === this.listOfYueUiSelectOptionComponent.length - this.maxItemLength) {
      this.yueUiSelectOnScrollToBottom.emit();
    }
  }

  public syncDimentions(): void {
    if (this.mode === 'multiple') {
      if (this.selections && this.selections.length) {
        let paddingTop = 0;
        let paddingLeft = 0;
        let heightTimes = 1;
        if (this.optionsSelectedsWrapper && this.optionsSelectedsWrapper.nativeElement) {
          const ELEMENT_DIMENTIONS_OPTIONS = elementDimentions(this.optionsSelectedsWrapper.nativeElement);
          if (ELEMENT_DIMENTIONS_OPTIONS) {
            paddingTop = ELEMENT_DIMENTIONS_OPTIONS.FULL_HEIGHT + 4;
            paddingLeft = ELEMENT_DIMENTIONS_OPTIONS.FULL_WIDTH + 4;
            if (this.inputFake && this.inputFake.nativeElement) {
              const ELEMENT_DIMENTIONS_INPUT = elementDimentions(this.inputFake.nativeElement);
              if (ELEMENT_DIMENTIONS_OPTIONS.FULL_WIDTH > (ELEMENT_DIMENTIONS_INPUT.WIDTH - (ELEMENT_DIMENTIONS_INPUT.WIDTH / 4))) {
                paddingLeft = 5;
                heightTimes = 2;
              } else {
                paddingTop = 4;
              }
            }
          }
        }
        if (this.inputFake && this.inputFake.nativeElement) {
          this._renderer.setStyle(this.inputFake.nativeElement, `padding-top`, `${paddingTop}px`);
          this._renderer.setStyle(this.inputFake.nativeElement, `padding-left`, `${paddingLeft}px`);
          if (heightTimes) {
            this._renderer.setStyle(this.inputFake.nativeElement, `height`, `${(paddingTop - 4) + 32}px`);
            this.syncWidth();
          } else {
            this._renderer.setStyle(this.inputFake.nativeElement, `height`, `32px`);
            this.syncWidth();
          }
        }
      } else {
        if (this.inputFake && this.inputFake.nativeElement) {
          this._renderer.setStyle(this.inputFake.nativeElement, `padding`, '4px 7px 5px');
          this._renderer.setStyle(this.inputFake.nativeElement, `height`, `32px`);
        }
      }
      this.syncWidth();
    }
  }

  public syncWidth(): void {
    if (this.isVisible) {
      if (this.overlay.overlayRef) {
        this.overlay.overlayRef.updatePosition();
        if (this.origin) {
          const EL = this.origin.elementRef.nativeElement;
          if (EL instanceof HTMLElement) {
            const WIDTH: number = elementDimentions(EL).WIDTH;
            this.overlay.overlayRef.updateSize({ width: WIDTH });
          }
        }
      }
    }
  }

  public isEmptyList(): boolean {
    return !(this.listOfYueUiSelectOptionComponent.length);
  }

  public show(): void {
    if (this.isVisible) {
      return void 0;
    }

    if (!this.isEmptyList()) {
      this.isVisible = true;
      this.yueUiSelectOnPanelOpenChange.next(true);

      setTimeout(() => {
        this.scrollToActivatedValue();
        this.syncWidth();
      }, 50);
      this.cdr.detectChanges();
    }
  }

  public hide(): void {
    if (!this.isVisible) {
      return void 0;
    }

    this.isVisible = false;
    this.yueUiSelectOnPanelOpenChange.next(false);
    this.cdr.detectChanges();
  }

  public researh(event: KeyboardEvent): void {
    if ([UP_ARROW, DOWN_ARROW, ENTER, TAB, ESCAPE].indexOf(event.keyCode) !== -1) {
      return void 0;
    }
    const realValue: string = (event.target as HTMLTextAreaElement).value || '';
    const value: string = removeAccents(realValue);
    this.searhBy.staticValue = realValue;
    this.searhBy.value = value;
    if (!this.timer) {
      this.timer = setTimeout(() => {
        this.yueUiSelectOnSearchChange.emit({
          valueWithoutAccents: this.searhBy.value,
          value: this.searhBy.staticValue
        });
        this.timer = null;
      }, this.yueUiSelectDebounceOnType);
    }
  }

  public focus(): void {
    if (!this.disabled) {
      this.focusToEl();
      this.show();
    }
  }

  public preventKeydown(event: KeyboardEvent): void {
    this.onKeyDown(event);
  }

  public updateOptionsStatus(): void {
    for (let i = 0, l = this.listOfYueUiSelectOptionComponent.length; i < l; i++) {
      const option = this.listOfYueUiSelectOptionComponent[i];
      if (option) {
        if (this.mode === `single`) {
          if (equals(this.value, option.value)) {
            (this.selections as any[]).push({
              label: option.label,
              value: option.value,
              component: option,
            });
            this._activatedValue = option.value;
            this.cdr.markForCheck();
          }
        } else if (this.mode === `multiple`) {
          if (this.value && Array.isArray(this.value) && this.value.length > 0) {
            for (let i = 0, l = this.value.length; i < l; i++) {
              if (equals(this.value[i], option.value)) {
                (this.selections as any[]).push({
                  label: option.label,
                  value: option.value,
                  component: option,
                });
                this._activatedValue = option.value;
                break;
              }
            }
            this.cdr.markForCheck();
          }
        }
      }
    }
  }

  public addOption(option: YueUiSelectOptionComponent): void {
    this.listOfYueUiSelectOptionComponent.push(option);
    if (this.mode === `single`) {
      if (equals(this.value, option.value)) {
        (this.selections as any[]).push({
          label: option.label,
          value: option.value,
          component: option,
        });
        this._activatedValue = option.value;
        this.cdr.markForCheck();
      }
    } else if (this.mode === `multiple`) {
      if (this.value && Array.isArray(this.value) && this.value.length > 0) {
        for (let i = 0, l = this.value.length; i < l; i++) {
          if (equals(this.value[i], option.value)) {
            (this.selections as any[]).push({
              label: option.label,
              value: option.value,
              component: option,
            });
            this._activatedValue = option.value;
            break;
          }
        }
        this.cdr.markForCheck();
      }
    }
  }

  public removeOption(option: YueUiSelectOptionComponent): void {
    const idx = this.listOfYueUiSelectOptionComponent.indexOf(option);
    if (idx > -1) {
      this.listOfYueUiSelectOptionComponent.splice(idx, 1);
    }
  }

  public clear(): void {
    this.value = null;
    this.selections = [];
    this._activatedValue = null;
    this.cdr.markForCheck();
  
    this.syncWidth();
    this.syncDimentions();
  }

  public writeValue(value: any): void {
    if (this.mode === `multiple`) {
      if (!Array.isArray(value)) {
        this.value = [
          value
        ];
      }
    } else {
      this.value = value;
    }
    this.updateOptionsStatus();
    this.cdr.markForCheck();
  }

  public setDisabledState(isDisabled?: boolean): void {
    if (typeof isDisabled === 'boolean') {
      this.disabled = isDisabled;
      this.cdr.markForCheck();
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.syncWidth();
  }

  public ngAfterContentChecked(): void {
    this.syncDimentions();
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void { }

}
