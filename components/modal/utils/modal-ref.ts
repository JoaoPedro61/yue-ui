
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { EventEmitter } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Base } from './base';

import { YueUiModalOptions } from './options';

export class YueUiModalRef<C> {

  public componentInstance: C | null = null;

  public result?: any;

  public readonly afterClose: Subject<any> = new Subject();

  public readonly afterOpen: Subject<void> = new Subject();

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

  constructor(private overlayRef: OverlayRef, private config: YueUiModalOptions<C>, public containerInstance: Base) {
    overlayRef
      .keydownEvents()
      .pipe(
        filter((event: any): any => {
          return (
            this.config.keyboard &&
            event.keyCode === ESCAPE &&
            !hasModifierKey(event)
          );
        })
      )
      .subscribe(event => {
        event.preventDefault();
        this.trigger(`cancel`);
      });

    containerInstance.cancelTriggered.pipe(take(1)).subscribe(() => this.trigger(`cancel`));

    containerInstance.okTriggered.pipe(take(1)).subscribe(() => this.trigger(`ok`));

    overlayRef
      .detachments()
      .subscribe({
        next: () => {
          this.afterClose.next(this.result);
          this.afterClose.complete();
          this.componentInstance = null;
          this.overlayRef.dispose();
        }
      });
  }

  getContentComponent(): C {
    return this.componentInstance as C;
  }

  destroy(result?: any): void {
    this.close(result);
  }

  triggerOk(): void {
    this.trigger(`ok`);
  }

  triggerCancel(): void {
    this.trigger(`cancel`);
  }

  close(result?: any): void {
    this.result = result;
    this._finishDialogClose();
  }

  updateConfig(config: YueUiModalOptions<C>): void {
    Object.assign(this.config, config);
    this.containerInstance.cdr.markForCheck();
    this.containerInstance.doUpdateConfigs();
  }

  getConfig(): YueUiModalOptions<C> {
    return this.config;
  }

  getBackdropElement(): HTMLElement | null {
    return this.overlayRef.backdropElement;
  }

  private trigger(action: 'ok' | 'cancel'): void {
    const trigger = { ok: this.config.onButtonOk, cancel: this.config.onButtonCancel }[action];
    if (trigger instanceof EventEmitter) {
      trigger.emit(this.getContentComponent());
    } else if (typeof trigger === 'function') {
      const result = trigger(this.getContentComponent());
      const caseClose = (doClose: boolean | void | {}) => doClose !== false && this.close(doClose as any);
      caseClose(result);
    }
  }

  public closeWhitResult(result: any): void {
    if (result !== false && result) {
      this.close(result);
    }
  }

  _finishDialogClose(): void {
    this.overlayRef.dispose();
  }

}
