import { Injectable, Injector, TemplateRef, Type, Optional, SkipSelf } from '@angular/core';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { SafeValue } from '@angular/platform-browser';
import { PortalInjector, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators'

import { logging } from '@joaopedro61/yue-ui/core/utils';


import { YueUiModalOptions } from './../utils/options';
import { YueUiModalRef } from './../utils/modal-ref';
import { Base } from './../utils/base';
import { YueUiContainerComponent } from './../components/container.component';
import { YueUiContainerComfirmComponent } from './../components/container-corfirm.component';


import { YueUiModalContent, YueUiModalConfirmType } from './../utils/interfaces';

const logger = logging.getLogger(`model.service`);




@Injectable()
export class YueUiModalService {

  private openModalsAtThisLevel: YueUiModalRef<any>[] = [];

  private readonly afterAllClosedAtThisLevel = new Subject<void>();

  get openedModals(): YueUiModalRef<any>[] {
    return this.parent ? this.parent.openedModals : this.openModalsAtThisLevel;
  }

  get _afterAllClosed(): Subject<void> {
    const parent = this.parent;
    return parent ? parent._afterAllClosed : this.afterAllClosedAtThisLevel;
  }

  constructor(private readonly overlay: Overlay, private readonly injector: Injector, @Optional() @SkipSelf() private readonly parent: YueUiModalService) { }

  private createOverlay<C>(config: YueUiModalOptions<C>): OverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.showMask,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().centerHorizontally().top(`10vh`),
      disposeOnNavigation: config.disposeOnNavigation,
      backdropClass: config.showMask ? `${config.backdropClass || `yue-ui-modal-backdrop`}` : `yue-ui-modal-backdrop-transparent`,
    });
    if ('width' in config) {
      overlayConfig.width = config.width;
    }
    if ('height' in config) {
      overlayConfig.height = config.height;
    }
    return this.overlay.create(overlayConfig);
  }

  private attachModalContainer<C>(overlayRef: OverlayRef, config: YueUiModalOptions<C>): Base {
    const map = new WeakMap<SafeValue, SafeValue>([
      [OverlayRef, overlayRef],
      [YueUiModalOptions, config],
    ]);
    const injector = new PortalInjector(this.injector, map);
    const ContainerComponent = config.type === 'confirm'
      ? YueUiContainerComfirmComponent
      : YueUiContainerComponent;
    const containerPortal = new ComponentPortal<Base>(ContainerComponent as any, undefined, injector);
    const containerRef = overlayRef.attach<Base>(containerPortal);
    return containerRef.instance;
  }

  private attachModalContent<C>(content: YueUiModalContent<C>, base: Base, ref: OverlayRef, config: YueUiModalOptions<C>): YueUiModalRef<C> {
    const modalRef = new YueUiModalRef<C>(ref, config, base);
    if (content instanceof TemplateRef) {
      const portal = new TemplatePortal<C>(content, null!, { $implicit: config.componentParams, modalRef } as any);
      base.attachTemplatePortal(portal);
    } else if (content instanceof Type && typeof content !== 'string') {
      const injectionTokens = new WeakMap<SafeValue, SafeValue>([[YueUiModalRef, modalRef]]);
      const injector = new PortalInjector(this.injector, injectionTokens);
      const portal = new ComponentPortal(content, undefined, injector);
      const contentRef = base.attachComponentPortal<C>(portal);
      Object.assign(contentRef.instance, config.componentParams || {});
      modalRef.componentInstance = contentRef.instance;
    } else {
      base.attachStringContent();
    }
    return modalRef;
  }

  private removeOpenModal(modalRef: YueUiModalRef<any>): void {
    const index = this.openedModals.indexOf(modalRef);
    if (index > -1) {
      this.openedModals.splice(index, 1);
      if (!this.openedModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private closeModals(dialogs: YueUiModalRef<any>[]): void {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
      if (!this.openedModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private open<C>(content: YueUiModalContent<C>, config?: YueUiModalOptions<C>): YueUiModalRef<C> {
    const configMerged = { ...(new YueUiModalOptions()), ...(config || {}), } as YueUiModalOptions<C>;
    const overlayRef = this.createOverlay(configMerged);
    const modalContainer = this.attachModalContainer(overlayRef, configMerged);
    const ref = this.attachModalContent<C>(content, modalContainer, overlayRef, configMerged);
    modalContainer.modalRef = ref;
    ref.afterClose.pipe(take(1)).subscribe({
      next: () => this.removeOpenModal(ref),
    });
    this.openedModals.push(ref);
    return ref;
  }

  public create<C>(config: YueUiModalOptions<C>): YueUiModalRef<C> {
    if (!config.content) {
      logger.error(`Sorry, you have to provide the "content" property.`);
    }
    // @ts-ignore
    return this.open<C>(config.content, config);
  }

  public confirm<C>(options: YueUiModalOptions<C> = {}, confirmType: YueUiModalConfirmType = 'confirm'): YueUiModalRef<C> {
    if ('footer' in options) {
      logger.error(`The Confirm-Modal doesn't support "footer", this property will be ignored.`);
      delete options.footer;
    }
    if (!('width' in options)) {
      options.width = 416;
    }
    if (!('maskClosable' in options)) {
      options.maskClosable = false;
    }
    options.type = 'confirm';
    options.confirmType = confirmType;
    options.okButtonType =
      confirmType === `confirm`
        ? `primary`
        : confirmType === `error`
          ? `danger`
          : confirmType === `info`
            ? `info`
            : confirmType === `success`
              ? `success`
              : confirmType === `warning`
                ? `warning`
                : `default`;
    return this.create(options);
  }

  public info<C>(options: YueUiModalOptions<C> = {}): YueUiModalRef<C> {
    return this.confirm(options, 'info');
  }

  public success<C>(options: YueUiModalOptions<C> = {}): YueUiModalRef<C> {
    return this.confirm(options, 'success');
  }

  public error<C>(options: YueUiModalOptions<C> = {}): YueUiModalRef<C> {
    return this.confirm(options, 'error');
  }

  public warning<C>(options: YueUiModalOptions<C> = {}): YueUiModalRef<C> {
    return this.confirm(options, 'warning');
  }

  public ngOnDestroy(): void {
    this.closeModals(this.openModalsAtThisLevel);
    this.afterAllClosedAtThisLevel.complete();
  }

}
