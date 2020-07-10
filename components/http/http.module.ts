import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';

import { YUE_UI_ENABLE_CACHE_RESPONSE, YUE_UI_HTTP_DYNAMIC_INTERCEPTORS, YUE_UI_PROGRESS_REQUESTS } from './http.utils';

import { YueUiHttpService } from './http.service';
import { YueUiHttpCacheService } from './http-cache.service';

import { HttpProgressRequestsComponent } from './http-progress-requests/http-progress-requests.component';

import { YueUiHttpCacheInterceptor } from './http-cache.interceptor';
import { YueUiHttpProgressInterceptor } from './http-progress.interceptor';

import { YueProgressRequestOptions } from './http.interfaces';



const logger = logging.getLogger('core.http');

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: YUE_UI_ENABLE_CACHE_RESPONSE, useValue: false },
    { provide: YUE_UI_HTTP_DYNAMIC_INTERCEPTORS, useValue: [] },
    { provide: YUE_UI_PROGRESS_REQUESTS, useValue: new BehaviorSubject<YueProgressRequestOptions>(null) },

    YueUiHttpService,
    YueUiHttpCacheService,
    YueUiHttpCacheInterceptor,
    YueUiHttpProgressInterceptor
  ],
  declarations: [
    HttpProgressRequestsComponent
  ],
  exports: [
    HttpProgressRequestsComponent
  ],
  entryComponents: [
    HttpProgressRequestsComponent
  ]
})
export class YueUiHttpModule {

  constructor() {
    logger.info(`YueUiHTTPModule on version: ${VERSION.full}`);
  }

}
