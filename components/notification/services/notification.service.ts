import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from "@angular/core";
import { YueUiSingletonService } from '@joaopedro61/yue-ui/core/services';
import { hash } from '@joaopedro61/yue-ui/core/utils';
import { YueUiNotificationData, YueUiNotificationOptions } from '../utils/interfaces';
import { YueUiNotificationRef } from '../utils/notification-ref';


import { YueUiNotificationContainerComponent } from './../components/notification-container.component';



@Injectable()
export class YueUiNotificationService {

  private prefix = `notification`;

  private container!: YueUiNotificationContainerComponent;

  constructor(
    private readonly overlay: Overlay,
    private readonly injector: Injector,
    private readonly singleton: YueUiSingletonService
  ) { }

  private createContainer<T extends YueUiNotificationContainerComponent>(cmp: Type<T>): T {
    let containerInstance = this.singleton.get(this.prefix);
    if (containerInstance) {
      return containerInstance as T;
    }

    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: this.overlay.position().global()
    });
    const componentPortal = new ComponentPortal(cmp, null, this.injector);
    const componentRef = overlayRef.attach(componentPortal);
    const overlayPane = overlayRef.overlayElement;
    overlayPane.style.zIndex = '1010';

    if (!containerInstance) {
      this.container = containerInstance = componentRef.instance;
      this.singleton.set(this.prefix, containerInstance);
    }

    return containerInstance as T;
  }

  private createInstance(message: Required<Pick<YueUiNotificationData, 'content' | 'title'>>, options?: YueUiNotificationOptions): YueUiNotificationRef {
    this.container = this.createContainer(YueUiNotificationContainerComponent);

    return this.container.create({
      ...message,
      ...{
        createdAt: new Date(),
        messageId: `notification-${hash()}`,
        options,
      }
    });
  }

  public remove(id: string): void {
    if (this.container) {
      if (id) {
        this.container.remove(id);
      }
    }
  }

  public removeAll(): void {
    if (this.container) {
      this.container.removeAll();
    }
  }

  public create(message: Pick<YueUiNotificationData, 'title' | 'content' | 'options'>) {
    return this.createInstance(message as any, message.options);
  }

  public info(title?: YueUiNotificationData['title'], content?: YueUiNotificationData['content'], options: YueUiNotificationOptions = {}) {
    options.type = `info`;
    return this.createInstance({
      title,
      content,
    } as any, options);
  }

  public success(title?: YueUiNotificationData['title'], content?: YueUiNotificationData['content'], options: YueUiNotificationOptions = {}) {
    options.type = `success`;
    return this.createInstance({
      title,
      content,
    } as any, options);
  }

  public warning(title?: YueUiNotificationData['title'], content?: YueUiNotificationData['content'], options: YueUiNotificationOptions = {}) {
    options.type = `warning`;
    return this.createInstance({
      title,
      content,
    } as any, options);
  }

  public error(title?: YueUiNotificationData['title'], content?: YueUiNotificationData['content'], options: YueUiNotificationOptions = {}) {
    options.type = `error`;
    return this.createInstance({
      title,
      content,
    } as any, options);
  }

  public blank(title?: YueUiNotificationData['title'], content?: YueUiNotificationData['content'], options: YueUiNotificationOptions = {}) {
    options.type = `blank`;
    return this.createInstance({
      title,
      content,
    } as any, options);
  }

}
