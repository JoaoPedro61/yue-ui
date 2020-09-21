import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { YueUiNotificationData, YueUiNotificationOptions } from '../utils/interfaces';


@Component({
  selector: `yue-ui-notification`,
  template: `
    B.U.C.E.T.A.
  `,
  styleUrls: [`./../styles/notification.component.less`],
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

  public ngOnInit(): void {
    this.options = this.instance.options as Required<YueUiNotificationOptions>;
    this.autoClose = this.options.duration > 0;
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
    this.destroyed.next({ id: this.instance.messageId });
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

}
