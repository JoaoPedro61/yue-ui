import { NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YUE_UI_ENABLE_CACHE_RESPONSE, YUE_UI_HTTP_DYNAMIC_INTERCEPTORS, YUE_UI_PROGRESS_REQUESTS, YUE_UI_HTTP_HEADERS, YUE_UI_HTTP_HEADERS_INTERCEPTOR } from './http.utils';

import { YueUiHttpService } from './http.service';
import { YueUiHttpCacheService } from './http-cache.service';

import { HttpProgressRequestsComponent } from './http-progress-requests/http-progress-requests.component';

import { YueUiHttpCacheInterceptor } from './http-cache.interceptor';
import { YueUiHttpProgressInterceptor } from './http-progress.interceptor';
import { YueUiHttpHeaderInterceptor } from './http-header.interceptor';

import { YueProgressRequestOptions } from './http.interfaces';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';



const logger = logging.getLogger('http');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    YueUiThematizationModule,
  ],
  providers: [
    { provide: YUE_UI_ENABLE_CACHE_RESPONSE, useValue: false },
    { provide: YUE_UI_HTTP_HEADERS, useValue: YUE_UI_HTTP_HEADERS_INTERCEPTOR },
    { provide: YUE_UI_HTTP_DYNAMIC_INTERCEPTORS, useValue: [] },
    { provide: YUE_UI_PROGRESS_REQUESTS, useValue: new BehaviorSubject<YueProgressRequestOptions>(null) },

    YueUiHttpService,
    YueUiHttpCacheService,
    YueUiHttpCacheInterceptor,
    YueUiHttpProgressInterceptor,
    YueUiHttpHeaderInterceptor
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
