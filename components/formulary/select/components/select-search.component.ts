import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { YueUiFormularyMask } from '@joaopedro61/yue-ui/formulary/mask';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-formulary-select-search',
  template: `
    <input
      #inputElement
      autocomplete="off"
      class="yue-ui-formulary-select-search-input"
      [ngModel]="value"
      [attr.autofocus]="autofocus ? 'autofocus' : null"
      [disabled]="disabled"
      [style.opacity]="showInput ? null : 0"
      (ngModelChange)="onValueChange($event)"
      (compositionstart)="setCompositionState(true);"
      (compositionend)="setCompositionState(false);"
      [yueUiFormularyMask]="mask"
    />
    <span #mirrorElement *ngIf="mirrorSync" class="yue-ui-formulary-select-search-mirror">&nbsp;</span>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiFormularySelectSearchRef',
  host: {
    '[class.yue-ui-formulary-select-search]': 'true',
  },
  providers: [
    {
      provide: COMPOSITION_BUFFER_MODE,
      useValue: false
    },
  ],
})
export class YueUiFormularySelectSearchComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input('disabled')
  public disabled = false;

  @Input('mirrorSync')
  public mirrorSync = false;

  @Input('showInput')
  public showInput = true;

  @Input('focusTrigger')
  public focusTrigger = false;

  @Input('value')
  public value = '';

  @Input('autofocus')
  public autofocus = false;
    
  @Input('mask')
  public mask!: YueUiFormularyMask;

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  @Output()
  public readonly isComposingChange = new EventEmitter<boolean>();

  @ViewChild('inputElement', { static: true })
  public inputElement!: ElementRef;

  @ViewChild('mirrorElement', { static: false })
  public mirrorElement?: ElementRef;

  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2, private readonly focusMonitor: FocusMonitor, public readonly cdr: ChangeDetectorRef) {}

  public setCompositionState(isComposing: boolean): void {
    this.isComposingChange.next(isComposing);
  }

  public onValueChange(value: string): void {
    this.value = value;
    this.valueChange.next(value);
    if (this.mirrorSync) {
      this.syncMirrorWidth();
    }
  }

  public clearInputValue(): void {
    const inputDOM = this.inputElement.nativeElement;
    inputDOM.value = '';
    this.onValueChange('');
  }

  public syncMirrorWidth(): void {
    const mirrorDOM = this.mirrorElement!.nativeElement;
    const hostDOM = this.elementRef.nativeElement;
    const inputDOM = this.inputElement.nativeElement;
    this.renderer.removeStyle(hostDOM, 'width');
    mirrorDOM.innerHTML = `${inputDOM.value}&nbsp;`;
    this.renderer.setStyle(hostDOM, 'width', `${mirrorDOM.scrollWidth}px`);
  }

  public focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  public blur(): void {
    this.inputElement.nativeElement.blur();
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const inputDOM = this.inputElement.nativeElement;
    const { focusTrigger, showInput } = changes;
    if (focusTrigger && focusTrigger.currentValue === true && focusTrigger.previousValue === false) {
      inputDOM.focus();
    }
    if (showInput) {
      if (this.showInput) {
        this.renderer.removeAttribute(inputDOM, 'readonly');
      } else {
        this.renderer.setAttribute(inputDOM, 'readonly', 'readonly');
      }
    }
  }

  public ngAfterViewInit(): void {
    if (this.mirrorSync) {
      this.syncMirrorWidth();
    }
    if (this.autofocus) {
      this.focus();
    }
  }

  public ngOnDestroy(): void {
  }

}
