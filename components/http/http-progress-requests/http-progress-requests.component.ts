import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { YUE_UI_PROGRESS_REQUESTS } from '../http.utils';

import { YueProgressRequest, YueProgressRequestOptions } from '../http.interfaces';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'yue-ui-http-progress-requests',
  template: `
    <ng-container *ngIf="metadataLoader$ | async">
      <div class="wrapper-loader-progress-http">
        <div class="loading-bar-http">
          <div class="content-sub-bars"></div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      @keyframes loading-box-1 {
        0% {
          left : -35%;
          right: 100%;
        }

        60%,
        100% {
          left : 100%;
          right: -90%;
        }
      }
      @keyframes loading-box-2 {
        0% {
          left : -200%;
          right: 100%;
        }

        60%,
        100% {
          left : 107%;
          right: -8%;
        }
      }
      :host .wrapper-loader-progress-http,
      .yue-ui-http-progress-requests .wrapper-loader-progress-http {
        position: absolute;
        z-index : 1050;
        width   : 100%;
        height  : 5px;
      }
      :host .wrapper-loader-progress-http .loading-bar-http,
      .yue-ui-http-progress-requests .wrapper-loader-progress-http .loading-bar-http {
        position  : absolute;
        top       : 0;
        left      : 50%;
        transform : translate(-50%, -50%);
        width     : 100%;
        height    : 6px;
        background: red;
        overflow  : hidden;
      }
      :host .wrapper-loader-progress-http .loading-bar-http .content-sub-bars::before,
      .yue-ui-http-progress-requests .wrapper-loader-progress-http .loading-bar-http .content-sub-bars::before {
        content   : "";
        position  : absolute;
        top       : 0px;
        left      : 0px;
        bottom    : 0px;
        background: var(--components-http-color);
        animation : loading-box-1 2100ms cubic-bezier(0.65, 0.81, 0.73, 0.4) infinite;
      }
      :host .wrapper-loader-progress-http .loading-bar-http .content-sub-bars::after,
      .yue-ui-http-progress-requests .wrapper-loader-progress-http .loading-bar-http .content-sub-bars::after {
        content        : "";
        position       : absolute;
        top            : 0px;
        left           : 0px;
        bottom         : 0px;
        background     : var(--components-http-color);
        animation      : loading-box-2 2100ms cubic-bezier(0.16, 0.84, 0.44, 1) infinite;
        animation-delay: 1150ms;
      }
    `
  ],
  host: {
    '[class.yue-ui-http-progress-requests]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpProgressRequestsComponent implements OnInit, OnDestroy {

  private subscription$: Subscription;

  public metadataLoader$: BehaviorSubject<YueProgressRequestOptions> = new BehaviorSubject(null as any);

  constructor(@Inject(YUE_UI_PROGRESS_REQUESTS) private readonly loader: YueProgressRequest) {
    this.subscription$ = this.loader.subscribe((v) => this.metadataLoader$.next(v));
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
    if (this.subscription$) {
      if (!this.subscription$.closed) {
        this.subscription$.unsubscribe();
      }
    }
  }

}
