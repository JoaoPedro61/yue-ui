import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef, HostListener, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, AfterViewChecked, RendererFactory2, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { 
  removeAccents,
  equals,
  elementDimentions,
} from '@JoaoPedro61/yue-ui/core/utils';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';

import { YueInputSelectOptionComponent } from './input-select-option/input-select-option.component';
import { InputSelectOption, InputSelectInternOption } from './interfaces';



const AddGettersOnOptions = (option: InputSelectOption, propLabel: string | null | false = null, propValue: string | null | false = null) => {
  Object.defineProperties(option, {
    propValue: {
      value: propValue,
      enumerable: false,
      writable: false
    },
    propLabel: {
      value: propLabel,
      enumerable: false,
      writable: false
    },
    valueProped: {
      get() {
        if (this.propValue === false) {
          return this;
        } else {
          if (this.propValue === null) {
            return this;
          } else {
            return this[this.propValue];
          }
        }
      },
      enumerable: false,
    },
    labelProped: {
      get() {
        if (this.propLabel === false) {
          return this;
        } else {
          if (this.propLabel === null) {
            return this;
          } else {
            return this[this.propLabel];
          }
        }
      },
      enumerable: false,
    }
  });
  return option as unknown as InputSelectInternOption;
};

const AddSelectedGetter = (option: InputSelectOption, value: boolean = false) => {
  Object.defineProperties(option, {
    selected: {
      value,
      enumerable: false,
      writable: false
    }
  });
  return option as unknown as InputSelectInternOption;
};

@Component({
  selector: 'yue-select',
  template: `
    <div class="input-select-wrapper" [class.single]="mode === 'single'" [class.multiple]="mode === 'multiple'"
      [class.disabled]="disabled" [class.mouseovering]="mouseovering" [class.showclear]="mouseovering && hasValue">
      <div class="input-select" #origin (mouseover)="mouseovering = true;" (mouseout)="mouseovering = false;">
        <div class="input-labels-value" #optionsSelecteds>
          <ng-container *ngIf="selections && selections.length && (mode === 'single' ? !showing : true)">
            <ng-container *ngFor="let option of selections; let index = index">
              <span class="option-selection">
                <span class="option-label" [innerText]="option.labelProped"></span>
                <ng-container *ngIf="mode === 'multiple' && !disabled">
                  <span class="handler-remover" (click)="removeOption(index);">
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
          <ng-container *ngIf="allowClear && !showing && !disabled && hasValue">
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
        <textarea #inputFake class="input-select-fake" autocomplete="off" role="combobox" aria-autocomplete="list"
          aria-haspopup="true" aria-expanded="true" wrap="off" aria-busy="false" (keyup)="researh($event)"
          (keydown)="preventEnter($event);" (focus)="focus();" [value]="searchValue" [placeholder]="placeholderActive"
          [disabled]="disabled"></textarea>
        <span class="icon-drop-menu"></span>
      </div>
      <select multiple="multiple" style="display: none;" [formControl]="abstractControl">
        <ng-container *ngFor="let selected of modelUnbinded">
          <option [value]="modelUnbinded" selected="selected"></option>
        </ng-container>
      </select>
      <ng-template #optionsList>
        <ng-container *ngFor="let option of options$ | async">
          <yue-input-select-option [value]="option"></yue-input-select-option>
        </ng-container>
      </ng-template>
      <ng-template cdk-portal>
        <div class="select-options-container"
          style="box-shadow: 0px 2px 3px var(--formulary-input-select-shadow-color);width: 100%;max-height: 250px;overflow-y: auto;background: var(--formulary-input-select-popup-background);color: var(--formulary-input-select-popup-color);">
          <ng-container *ngTemplateOutlet="optionsList"></ng-container>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./input-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueInputSelectComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {

  @ViewChildren(YueInputSelectOptionComponent) private optionslist!: QueryList<YueInputSelectOptionComponent>;

  @ViewChild('origin', { read: ElementRef, static: false }) private origin!: ElementRef<HTMLDivElement>;

  @ViewChild('optionsSelecteds', { read: ElementRef, static: false }) private optionsSelecteds!: ElementRef<HTMLDivElement>;

  @ViewChild('inputFake', { read: ElementRef, static: false }) private inputFake!: ElementRef<HTMLTextAreaElement>;

  @ViewChild(CdkPortal, { static: false }) private container!: CdkPortal;

  private timer: any = null;

  private _model: any;

  private searhBy = {
    staticValue: '',
    value: ''
  };

  @Output() public modelChange: EventEmitter<any> = new EventEmitter();

  @Output() public searching: EventEmitter<{
    valuenoaccents: string;
    value: string;
  }> = new EventEmitter();

  @Input() public get model(): any {
    return this._model;
  }

  public set model(value: any) {
    this._model = value;
    this.modelChange.emit(this._model);
  }

  @Input() public options: InputSelectOption[] | Observable<InputSelectOption[]> = [];

  @Input() public disabled = false;

  @Input() public allowClear = true;

  @Input() public debounceOnType = 250;

  @Input() public forceUpdates = true;

  @Input() public propLabel: string | false = 'label';

  @Input() public propValue: string | false = 'value';

  @Input() public mode: 'multiple' | 'single' = 'single';

  @Input() public placeholder = '';

  @Input() public abstractControl: FormControl = new FormControl();

  @Input() public templateOption: TemplateRef<any> | null = null;

  public get classlist(): { [x: string]: boolean } {
    return {
      [this.mode]: true
    };
  }

  public get placeholderActive(): string {
    if (this.selections.length) {
      return ``;
    }
    return this.placeholder;
  }

  public get searchValue(): string {
    if (this.selections.length) {
      return ``;
    }
    return this.searhBy.staticValue;
  }

  public get selected(): any[] {
    if (this.abstractControl.value) {
      return this.abstractControl.value;
    }
    return [];
  }

  public get isObservable(): boolean {
    return this.options instanceof Observable;
  }

  public get hasValue(): boolean {
    if (this.modelUnbinded.length) {
      return true;
    }
    return false;
  }

  public options$: BehaviorSubject<InputSelectInternOption[]> = new BehaviorSubject<InputSelectInternOption[]>([]);

  public selections: InputSelectInternOption[] = [];

  public modelUnbinded: any[] = [];

  private state: 'ALLOW' | 'UNALLOW' = 'ALLOW';

  private stateSearch: 'ALLOW' | 'UNALLOW' = 'ALLOW';

  private subscritionDynamic$!: Subscription;

  private subscritionChanges$!: Subscription;

  protected overlayRef!: OverlayRef;

  public showing = false;

  public mouseovering = false;

  private renderer: Renderer2;

  private viewTimesChecked = 0;

  constructor(private readonly rendererFactory: RendererFactory2, private readonly overlay: Overlay, private readonly detector: ChangeDetectorRef) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.origin.nativeElement)
      .withPush(false)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }, {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
      }]);

    return new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }

  private open(): void {
    this.state = 'ALLOW';
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.container);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
    this.detector.detectChanges();
  }

  private hide(): void {
    this.state = 'ALLOW';
    if (this.inputFake.nativeElement) {
      this.inputFake.nativeElement.value = '';
    }
    this.overlayRef.detach();
    this.showing = false;
    this.detector.detectChanges();
    this.stateSearch = 'UNALLOW';
    setTimeout(() => {
      this.stateSearch = 'ALLOW';
    });
  }

  private syncWidth(): void {
    if (!this.overlayRef) {
      return void 0;
    }
    if (this.origin.nativeElement) {
      const refRect = this.origin.nativeElement.getBoundingClientRect();
      this.overlayRef.updateSize({ width: refRect.width });
      this.overlayRef.updatePosition();
    }
  }

  private checkOptions(): void {
    this.state = `UNALLOW`;
    const options: InputSelectInternOption[] = [];
    if (this.options instanceof Observable) {
      const subscription = this.options.subscribe((value: InputSelectOption[]) => {
        for (let i = 0, l = value.length; i < l; i++) {
          options.push(AddSelectedGetter(AddGettersOnOptions(value[i], this.propLabel, this.propValue), false));
        }
        if (subscription) {
          subscription.unsubscribe();
        }
      }, () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      }, () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    } else {
      for (let i = 0, l = this.options.length; i < l; i++) {
        options.push(AddSelectedGetter(AddGettersOnOptions(this.options[i], this.propLabel, this.propValue), false));
      }
    }
    const fullyModel = [];
    const arrayModel = !Array.isArray(this.model) ? [this.model] : this.model;
    const selecteds = [];
    if (options.length) {
      for (let iM = 0, lM = arrayModel.length; iM < lM; iM++) {
        loop1:
        for (let iO = 0, lengthOption = options.length; iO < lengthOption; iO++) {
          if (equals(arrayModel[iM], options[iO].valueProped)) {
            fullyModel.push(options[iO].valueProped);
            selecteds.push(options[iO]);
            AddSelectedGetter(options[iO], true);
            break loop1;
          }
        }
      }
    }
    this.selections = selecteds;
    this.modelUnbinded = fullyModel as any;
    if (this.mode === 'single') {
      const first = this.modelUnbinded.shift();
      if (first) {
        this.abstractControl.setValue(first);
      }
    } else {
      this.abstractControl.setValue(fullyModel);
    }
    this.options$.next(options);
    if (this.viewTimesChecked < 10) {
      this.ngAfterViewChecked();
    }
  }

  public selectionOptionHandler(option: YueInputSelectOptionComponent): void {
    this.state = 'UNALLOW';
    if (this.mode === 'single') {
      this.optionslist.forEach(o => {
        o.selected = false;
        o.unselect();
      });
      AddSelectedGetter(option.value, true);
      this.selections = [option.value];
      this.modelUnbinded = [option.value.valueProped as any];
      this.model = option.value.valueProped;
      this.abstractControl.setValue(option.value.valueProped);
      this.detector.detectChanges();
      option.selected = true;
      option.select();
      setTimeout(() => {
        this.hide();
      });
    } else if (this.mode === 'multiple') {
      if (option.selected) {
        for (let index = 0, length = this.modelUnbinded.length; index < length; index++) {
          if (equals(this.modelUnbinded[index], option.valueProped)) {
            option.unselect();
            option.selected = false;
            AddSelectedGetter(option.value, false);
            this.modelUnbinded.splice(index, 1);
            this.selections.splice(index, 1);
            this.modelUnbinded = this.modelUnbinded;
            this.selections = this.selections;
            this.model.splice(index, 1);
            this.model = this.model;
            this.abstractControl.setValue(this.modelUnbinded.length ? this.model : null);
            this.detector.detectChanges();
            break;
          }
        }
      } else {
        option.select();
        option.selected = true;
        this.modelUnbinded.push(option.valueProped);
        this.selections.push(option.value);
        this.modelUnbinded = this.modelUnbinded;
        this.selections = this.selections;
        if (!Array.isArray(this.model)) {
          this.model = [];
        }
        this.model.push(option.valueProped);
        this.model = this.model;
        this.abstractControl.setValue(this.model);
        this.detector.detectChanges();
      }
    }
    this.syncWidth();
  }

  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  public focus(): void {
    this.open();
  }

  public preventEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  public researh(event: KeyboardEvent): void {
    if (this.stateSearch === 'ALLOW') {
      const realValue: string = (event.target as HTMLTextAreaElement).value || '';
      const value: string = removeAccents(realValue);
      this.searhBy.staticValue = realValue;
      this.searhBy.value = value;
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searching.emit({
            valuenoaccents: this.searhBy.value,
            value: this.searhBy.staticValue
          });
          this.timer = null;
        }, this.debounceOnType);
      }
    }
  }

  public isObject(value: any): boolean {
    return 'object' === typeof value && !Array.isArray(value);
  }

  public removeOption(index: number): void {
    this.state = `UNALLOW`;
    this.modelUnbinded.splice(index, 1);
    this.selections.splice(index, 1);
    this.modelUnbinded = this.modelUnbinded;
    this.selections = this.selections;
    this.model.splice(index, 1);
    this.model = this.model;
    this.abstractControl.setValue(this.modelUnbinded.length ? this.model : null);
    this.detector.detectChanges();
    this.checkOptions();
  }

  public clear(): void {
    this.state = `UNALLOW`;
    if (this.mode === 'single') {
      this.modelUnbinded = [];
      this.selections = [];
      this.model = null;
      this.abstractControl.setValue(null);
      this.detector.detectChanges();
    } else if (this.mode === 'multiple') {
      this.modelUnbinded = [];
      this.selections = [];
      this.model = null;
      this.abstractControl.setValue(null);
      this.detector.detectChanges();
    }
    this.checkOptions();
  }

  public ngOnInit(): void {
    if (Array.isArray(this.selected) ? this.selected.length : this.selected) {
      if (this.mode === `multiple`) {
        if (!Array.isArray(this.selected)) {
          this.model = [this.selected];
        }
      }
    }
    if (this.abstractControl instanceof FormControl) {
      this.subscritionChanges$ = this.abstractControl.valueChanges.subscribe((value: any) => {
        if (this.state === `ALLOW`) {
          this.modelUnbinded = [];
          this.selections = [];
          this.model = value;
          this.checkOptions();
          this.detector.markForCheck();
          this.detector.detectChanges();
        } else {
          this.state = `ALLOW`;
        }
      });
    }
    setTimeout(() => {
      this.ngAfterViewChecked();
    });
  }

  public ngAfterViewInit(): void {
    this.subscritionDynamic$ = this.optionslist.changes.subscribe(() => {
      this.optionslist.forEach(item => {
        item.regiterOnSelectOption(this.selectionOptionHandler.bind(this));
        item.propValue = this.propValue;
        item.propLabel = this.propLabel;
        if (this.templateOption) {
          item.template = this.templateOption;
        }
      });
    });
    this.checkOptions();
  }

  public ngAfterViewChecked(): void {
    if (this.viewTimesChecked < 100) {
      this.viewTimesChecked++;
    }
    if (this.mode === 'multiple') {
      if (this.selections && this.selections.length) {
        let paddingTop = 0;
        let paddingLeft = 0;
        let heightTimes = 1;
        if (this.optionsSelecteds && this.optionsSelecteds.nativeElement) {
          const elementDimentions_options = elementDimentions(this.optionsSelecteds.nativeElement);
          if (elementDimentions_options) {
            paddingTop = elementDimentions_options.FULL_HEIGHT + 4;
            paddingLeft = elementDimentions_options.FULL_WIDTH + 4;
            if (this.inputFake && this.inputFake.nativeElement) {
              const elementDimentions_input = elementDimentions(this.inputFake.nativeElement);
              if (elementDimentions_options.FULL_WIDTH > (elementDimentions_input.WIDTH - (elementDimentions_input.WIDTH / 4))) {
                paddingLeft = 5;
                heightTimes = 2;
              } else {
                paddingTop = 4;
              }
            }
          }
        }
        if (this.inputFake && this.inputFake.nativeElement) {
          this.renderer.setStyle(this.inputFake.nativeElement, `padding-top`, `${paddingTop}px`);
          this.renderer.setStyle(this.inputFake.nativeElement, `padding-left`, `${paddingLeft}px`);
          if (heightTimes) {
            this.renderer.setStyle(this.inputFake.nativeElement, `height`, `${(paddingTop - 4) + 32}px`);
            this.syncWidth();
          } else {
            this.renderer.setStyle(this.inputFake.nativeElement, `height`, `32px`);
            this.syncWidth();
          }
        }
      } else {
        if (this.inputFake && this.inputFake.nativeElement) {
          this.renderer.setStyle(this.inputFake.nativeElement, `padding`, '4px 7px 5px');
        }
      }
    }
  }

  public ngOnDestroy(): void {
    if (this.subscritionDynamic$) {
      this.subscritionDynamic$.unsubscribe();
    }
    if (this.subscritionChanges$) {
      this.subscritionChanges$.unsubscribe();
    }
  }

}
