import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NOTIFICATION_MOTION } from '@joaopedro61/yue-ui/core/animations';

import { YueUiNotificationData, YueUiNotificationOptions } from '../utils/interfaces';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-notification`,
  template: `
    <div
      class="yue-ui-notification-notice yue-ui-notification-notice-closable"
      [class.yue-ui-notification-success]="type === 'success'"
      [class.yue-ui-notification-info]="type === 'info'"
      [class.yue-ui-notification-warning]="type === 'warning'"
      [class.yue-ui-notification-error]="type === 'error'"
      [class.yue-ui-notification-blank]="type === 'blank'"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
      [@notificationMotion]="state"
      [class.yue-ui-notification-notice-no-titled]="!instance.title"
    >
      <div class="yue-ui-notification-notice-content">
        <div class="yue-ui-notification-notice-content" [ngClass]="{ 'yue-ui-notification-notice-with-icon': instance.options.type !== 'blank' }">
          <div class="yue-ui-notification-notice-wrap" [class.yue-ui-notification-notice-with-icon]="instance.options.type !== 'blank'">
            <div class="yue-ui-notification-notice-wrap-content yue-ui-notification-notice-wrap-content-icon" *ngIf="instance.options.type && instance.options.type !== 'blank'">
              <ng-container [ngSwitch]="instance.options.type">
                <i
                  *ngSwitchCase="'success'"
                  yueUiIcon
                  yueUiIconType="yue-ui-gg-check-o"
                  class="yue-ui-notification-notice-icon yue-ui-notification-notice-icon-success"
                ></i>
                <i
                  *ngSwitchCase="'info'"
                  yueUiIcon
                  yueUiIconType="yue-ui-gg-bulb"
                  class="yue-ui-notification-notice-icon yue-ui-notification-notice-icon-info"
                ></i>
                <i
                  *ngSwitchCase="'warning'"
                  yueUiIcon
                  yueUiIconType="yue-ui-gg-info"
                  class="yue-ui-notification-notice-icon yue-ui-notification-notice-icon-warning"
                ></i>
                <i
                  *ngSwitchCase="'error'"
                  yueUiIcon
                  yueUiIconType="yue-ui-gg-danger"
                  class="yue-ui-notification-notice-icon yue-ui-notification-notice-icon-error"
                ></i>
              </ng-container>
            </div>
            <div class="yue-ui-notification-notice-wrap-content yue-ui-notification-notice-wrap-content-message" [class.yue-ui-notification-notice-wrap-content-message-no-titled]="!instance.title">
              <ng-container *ngIf="instance.title">
                <div class="yue-ui-notification-notice-message">
                  <yue-ui-smart-render [yueUiSmartRender]="instance.title" [yueUiSmartRenderContext]="instance"></yue-ui-smart-render>
                </div>
              </ng-container>
              <ng-container *ngIf="instance.content">
                <div class="yue-ui-notification-notice-description">
                  <yue-ui-smart-render [yueUiSmartRender]="instance.content" [yueUiSmartRenderContext]="instance"></yue-ui-smart-render>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
      <a tabindex="0" class="yue-ui-notification-notice-close" (click)="destroy()">
        <span class="yue-ui-notification-notice-close-x">
          <i yueUiIcon yueUiIconType="yue-ui-gg-close" class="yue-ui-notification-close-icon"></i>
        </span>
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiNotificationRef',
  host: { },
  animations: [
    NOTIFICATION_MOTION
  ]
})
export class YueUiNotificationComponent implements OnDestroy, OnInit {

  private options!: Required<YueUiNotificationOptions>;

  @Input()
  public instance!: Required<YueUiNotificationData>;

  @Output()
  public readonly destroyed = new EventEmitter<{ id: string }>();

  private autoClose?: boolean;

  private eraseTimer: number | null = null;

  private eraseTimingStart?: number;

  private eraseTTL!: number;

  private placement!: string | undefined;

  public type: string = 'blank';

  constructor(private readonly cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.options = this.instance.options as Required<YueUiNotificationOptions>;
    this.type = this.options.type;
    this.placement = this.options.placement;
    this.autoClose = this.options.duration > 0;
    (this.instance as any).state = 'enter';
    if (this.autoClose) {
      this.initErase();
      this.startEraseTimeout();
    }
  }

  public ngOnDestroy(): void {
    if (this.autoClose) {
      this.clearEraseTimeout();
    }
  }

  public onEnter(): void {
    if (this.autoClose && this.options.pauseOnHover) {
      this.clearEraseTimeout();
      this.updateTTL();
    }
  }

  public onLeave(): void {
    if (this.autoClose && this.options.pauseOnHover) {
      this.startEraseTimeout();
    }
  }

  public destroy(): void {
    (this.instance as any).state = 'leave';
    this.cdr.detectChanges();
    setTimeout(() => {
      this.destroyed.next({ id: this.instance.messageId });
    }, 200);
  }

  private initErase(): void {
    this.eraseTTL = this.options.duration;
    this.eraseTimingStart = Date.now();
  }

  private updateTTL(): void {
    if (this.autoClose) {
      this.eraseTTL -= Date.now() - this.eraseTimingStart!;
    }
  }

  private startEraseTimeout(): void {
    if (this.eraseTTL > 0) {
      this.clearEraseTimeout();
      this.eraseTimer = setTimeout(() => this.destroy(), this.eraseTTL);
      this.eraseTimingStart = Date.now();
    } else {
      this.destroy();
    }
  }

  private clearEraseTimeout(): void {
    if (this.eraseTimer !== null) {
      clearTimeout(this.eraseTimer);
      this.eraseTimer = null;
    }
  }

  public get state(): string | undefined {
    if ((this.instance as any).state === 'enter') {
      if (this.placement === 'topLeft' || this.placement === 'bottomLeft') {
        return 'enterLeft';
      } else {
        return 'enterRight';
      }
    } else {
      return (this.instance as any).state;
    }
  }

}
