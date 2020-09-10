import { Directive, OnDestroy, ChangeDetectorRef, ElementRef, ComponentRef, EventEmitter, EmbeddedViewRef } from '@angular/core';
import { BasePortalOutlet, ComponentPortal, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { ConfigurableFocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { YueUiModalRef } from './modal-ref';
import { YueUiModalOptions } from './options';

import { YueUiModalFooterComponent } from '../components/footer.component';
import { YueUiModalHeaderComponent } from '../components/header.component';




@Directive()
export abstract class Base extends BasePortalOutlet implements OnDestroy {

  public portalOutlet!: CdkPortalOutlet;

  public modalElementRef!: ElementRef<HTMLDivElement>;

  public modalFooterRef!: YueUiModalFooterComponent;

  public modalHeaderRef!: YueUiModalHeaderComponent;

  public cancelTriggered = new EventEmitter<void>();

  public okTriggered = new EventEmitter<void>();

  public elementFocusedBeforeModalWasOpened: HTMLElement | null = null;

  public document!: any;

  public modalRef!: YueUiModalRef<any>;

  public isStringOrObservableContent: boolean = false;

  private focusTrap!: FocusTrap;

  protected untilDestroy$: Subject<void> = new Subject();

  public get padding(): string {
    if (this.config.padding && this.config.padding.body) {
      return typeof this.config.padding.body === `number` ? `${this.config.padding.body}px` : this.config.padding.body;
    }
    return `10px`;
  }

  public get width(): string {
    if (this.config.width) {
      return typeof this.config.width === `number` ? `${this.config.width}px` : this.config.width;
    }
    return `450px`;
  }

  public get height(): string {
    if (this.config.height) {
      return typeof this.config.height === `number` ? `${this.config.height}px` : this.config.height;
    }
    return `auto`;
  }

  public get isAObservable(): boolean {
    return this.config.content instanceof Observable;
  }

  public get ngSafeValue_content(): any {
    return this.config.content;
  }

  public get paddingHeader(): string {
    if (this.config.padding && this.config.padding.header) {
      return typeof this.config.padding.header === `number` ? `${this.config.padding.header}px` : this.config.padding.header;
    }
    return `10px`;
  }

  public get headerIsAObservable(): boolean {
    return this.config.header instanceof Observable;
  }

  public get ngSafeValue_header(): any {
    return this.config.header;
  }

  public get paddingFooter(): string {
    if (this.config.padding && this.config.padding.footer) {
      return typeof this.config.padding.footer === `number` ? `${this.config.padding.footer}px` : this.config.padding.footer;
    }
    return `10px`;
  }

  public get isAObservableCancelButtonText(): boolean {
    return this.config.cancelButtonText instanceof Observable;
  }

  public get isAObservableOkButtonText(): boolean {
    return this.config.okButtonText instanceof Observable;
  }

  public get footerIsAObservable(): boolean {
    return this.config.footer instanceof Observable;
  }

  public get ngSafeValue_footer(): any {
    return this.config.footer;
  }

  public get ngSafeValue_okButtonText(): any {
    return this.config.okButtonText;
  }

  public get ngSafeValue_cancelButtonText(): any {
    return this.config.cancelButtonText;
  }

  public get footerIsEmpty(): boolean {
    return this.config.footer
      ? typeof this.config.footer === `string`
        ? !this.config.footer.length
        : !!this.config.footer
      : this.config.okButtonText
        ? typeof this.config.okButtonText === `string`
          ? !this.config.okButtonText.length
          : !!this.config.okButtonText
        : this.config.cancelButtonText
          ? typeof this.config.cancelButtonText === `string`
            ? !this.config.cancelButtonText.length
            : !!this.config.cancelButtonText
          : true
  }

  constructor(
    protected elementRef: ElementRef,
    protected focusTrapFactory: ConfigurableFocusTrapFactory,
    public cdr: ChangeDetectorRef,
    public overlayRef: OverlayRef,
    public config: YueUiModalOptions<any>,
    document?: any
  ) {
    super();
    this.document = document as any;
    this.isStringOrObservableContent = (typeof config.content === 'string' || (config.content instanceof Observable));
    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.untilDestroy$))
      .subscribe({
        next: () => {
          if (this.config.maskClosable) {
            this.cancelTriggered.next();
          }
        }
      });
  }

  private savePreviouslyFocusedElement(): void {
    if (!this.focusTrap) {
      this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
    }
    if (this.document) {
      this.elementFocusedBeforeModalWasOpened = this.document.activeElement as HTMLElement;
      if (this.elementRef.nativeElement.focus) {
        Promise.resolve().then(() => this.elementRef.nativeElement.focus());
      }
    }
    if (this.overlayRef.hasAttached()) {
      this.trapFocus();
    }
  }

  private trapFocus(): void {
    const element = this.elementRef.nativeElement;
    if (this.config.autofocus) {
      this.focusTrap.focusInitialElementWhenReady().then();
    } else {
      const activeElement = this.document.activeElement;
      if (activeElement !== element && !element.contains(activeElement)) {
        element.focus();
      }
    }
  }

  private restoreFocus(): void {
    const toFocus = this.elementFocusedBeforeModalWasOpened as HTMLElement;
    if (toFocus && typeof toFocus.focus === 'function') {
      const activeElement = this.document.activeElement as Element;
      const element = this.elementRef.nativeElement;
      if (!activeElement || activeElement === this.document.body || activeElement === element || element.contains(activeElement)) {
        toFocus.focus();
      }
    }
    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }

  public attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throw Error('Attempting to attach modal content after content is already attached');
    }
    this.savePreviouslyFocusedElement();
    return this.portalOutlet.attachComponentPortal(portal);
  }

  public attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet.hasAttached()) {
      throw Error('Attempting to attach modal content after content is already attached');
    }
    this.savePreviouslyFocusedElement();
    return this.portalOutlet.attachTemplatePortal(portal);
  }

  public attachStringContent(): void {
    this.savePreviouslyFocusedElement();
  }

  public doUpdateConfigs(): void {
    if (this.modalFooterRef) {
      this.modalFooterRef.cdr.markForCheck();
    }
    if (this.modalHeaderRef) {
      this.modalHeaderRef.cdr.markForCheck();
    }
  }

  public triggerOk(): void {
    this.modalRef.triggerOk();
  }
  
  public triggerCancel(): void {
    this.modalRef.triggerCancel();
  }

  public ngOnDestroy(): void {
    this.restoreFocus();
    this.untilDestroy$.next();
    this.untilDestroy$.complete();
  }

}
