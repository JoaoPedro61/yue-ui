
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Base } from './base';

import { YueUiModalOptions } from './options';

export class YueUiModalRef<C> {

  public componentInstance: C | null = null;

  public result?: any;

  public readonly afterClose: Subject<any> = new Subject();

  public readonly afterOpen: Subject<void> = new Subject();

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
  }

  getConfig(): YueUiModalOptions<C> {
    return this.config;
  }

  getBackdropElement(): HTMLElement | null {
    return this.overlayRef.backdropElement;
  }

  private trigger(action: 'ok' | 'cancel'): void {
    const trigger = { ok: this.config.onOk, cancel: this.config.onCancel }[action];
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
