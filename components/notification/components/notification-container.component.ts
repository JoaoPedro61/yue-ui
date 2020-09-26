import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from "@angular/core";

import { YueUiNotificationData, YueUiNotificationGlobalOptions, YueUiNotificationOptions } from '../utils/interfaces';
import { YueUiNotificationRef } from '../utils/notification-ref';
import { YUE_UI_NOTIFICATION_GLOBAL_OPTIONS } from './../utils/token';



@Component({
  template: `
    <div class="yue-ui-notification yue-ui-notification-topLeft" [style.top]="top" [style.left]="'0px'">
      <yue-ui-notification
        *ngFor="let instance of topLeftInstances"
        [instance]="instance"
        (destroyed)="remove($event.id)"
      ></yue-ui-notification>
    </div>
    <div class="yue-ui-notification yue-ui-notification-topRight" [style.top]="top" [style.right]="'0px'">
      <yue-ui-notification
        *ngFor="let instance of topRightInstances"
        [instance]="instance"
        (destroyed)="remove($event.id)"
      ></yue-ui-notification>
    </div>
    <div class="yue-ui-notification yue-ui-notification-bottomLeft" [style.bottom]="bottom" [style.left]="'0px'">
      <yue-ui-notification
        *ngFor="let instance of bottomLeftInstances"
        [instance]="instance"
        (destroyed)="remove($event.id)"
      ></yue-ui-notification>
    </div>
    <div class="yue-ui-notification yue-ui-notification-bottomRight" [style.bottom]="bottom" [style.right]="'0px'">
      <yue-ui-notification
        *ngFor="let instance of bottomRightInstances"
        [instance]="instance"
        (destroyed)="remove($event.id)"
      ></yue-ui-notification>
    </div>
  `,
  styleUrls: [`./../styles/common.less`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-notification-container]': `true`,
  },
})
export class YueUiNotificationContainerComponent {

  public bottom?: string | null = `25px`;

  public top?: string | null = `25px`;

  private readonly maxStack = 5;

  private instances: Array<Required<YueUiNotificationData>> = [];

  public topLeftInstances: Array<Required<YueUiNotificationData>> = [];

  public topRightInstances: Array<Required<YueUiNotificationData>> = [];

  public bottomLeftInstances: Array<Required<YueUiNotificationData>> = [];

  public bottomRightInstances: Array<Required<YueUiNotificationData>> = [];

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject(YUE_UI_NOTIFICATION_GLOBAL_OPTIONS) private readonly config: YueUiNotificationGlobalOptions
  ) { }

  private updateInstances(): void {
    this.topLeftInstances = this.instances.filter(m => m.options.placement === 'topLeft');
    this.topRightInstances = this.instances.filter(m => m.options.placement === 'topRight' || !m.options.placement);
    this.bottomLeftInstances = this.instances.filter(m => m.options.placement === 'bottomLeft');
    this.bottomRightInstances = this.instances.filter(m => m.options.placement === 'bottomRight');
    this.cdr.markForCheck();
  }

  private merge(options?: YueUiNotificationOptions): YueUiNotificationOptions {
    const { duration, pauseOnHover, placement } = this.config;
    return { duration, pauseOnHover, placement: placement, ...options };
  }

  public create(notification: YueUiNotificationData): YueUiNotificationRef {
    const noty = notification as Required<YueUiNotificationData>;
    noty.options = this.merge(noty.options);
    const identifier = noty.options.identifier;
    const notyWithSameKey = this.instances.find(
      msg => msg.options.identifier === (noty.options as Required<YueUiNotificationOptions>).identifier
    );
    if (identifier && notyWithSameKey) {
      (notyWithSameKey as any).title = noty.title;
      (notyWithSameKey as any).content = noty.content;
      (notyWithSameKey as any).options = noty.options;
    } else {
      if (this.instances.length >= this.maxStack) {
        this.instances = this.instances.slice(1);
      }
      this.instances = [...this.instances, noty as any];
    }
    this.updateInstances();
    return noty;
  }

  public remove(id: string): void {
    this.instances.some((instance, index) => {
      if (instance.messageId === id) {
        this.instances.splice(index, 1);
        this.instances = [...this.instances];
        this.updateInstances();
        return true;
      }
      return false;
    });
  }

  public removeAll(): void {
    this.instances = [];
    this.updateInstances();
  }

}
