import { Directive, OnDestroy, ChangeDetectorRef, ElementRef, ComponentRef, EventEmitter, EmbeddedViewRef } from '@angular/core';
import { BasePortalOutlet, ComponentPortal, CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { YueUiModalOptions } from './options';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { YueUiModalRef } from './modal-ref';




@Directive()
export abstract class Base extends BasePortalOutlet implements OnDestroy {

  public portalOutlet!: CdkPortalOutlet;

  public modalElementRef!: ElementRef<HTMLDivElement>;

  public cancelTriggered = new EventEmitter<void>();

  public okTriggered = new EventEmitter<void>();

  public elementFocusedBeforeModalWasOpened: HTMLElement | null = null;

  public document!: Document;

  public modalRef!: YueUiModalRef<any>;

  public isStringContent: boolean = false;

  private focusTrap!: FocusTrap;

  protected untilDestroy$: Subject<void> = new Subject();

  constructor(
    protected elementRef: ElementRef,
    protected focusTrapFactory: FocusTrapFactory,
    public cdr: ChangeDetectorRef,
    public overlayRef: OverlayRef,
    public config: YueUiModalOptions<any>,
    document?: Document
  ) {
    super();
    this.document = document as Document;
    this.isStringContent = typeof config.content === 'string';
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

  public ngOnDestroy(): void {
    this.untilDestroy$.next();
    this.untilDestroy$.complete();
  }

}
