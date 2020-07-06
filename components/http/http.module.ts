import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { VERSION } from 'yue-ui/version';
import { logging } from 'yue-ui/core/utils';

import { YUE_UI_ENABLE_CACHE_RESPONSE, YUE_UI_HTTP_DYNAMIC_INTERCEPTORS, YUE_UI_PROGRESS_REQUESTS } from './http.utils';

import { YueUiHttpService } from './http.service';
import { YueUiHttpCacheService } from './http-cache.service';

import { HttpProgressRequestsComponent } from './http-progress-requests/http-progress-requests.component';

import { YueUiHttpCacheInterceptor } from './http-cache.interceptor';
import { YueUiHttpProgressInterceptor } from './http-progress.interceptor';

import { YueProgressRequestOptions } from './http.interfaces';



const logger = logging.getLogger('core.http');

/**
 * HTTP module, with simple abstractions to use
 *
 * @usageNotes
 * Import this module in your module
 *
 * ```typescript
 * ...
 *
 * {
 *   imports: [
 *     YueUiHttpModule,
 *   ]
 * }
 * ...
 * ```
 *
 * You can add dynamic interceptors when importing
 * the module, using the injection token "YUE_UI_HTTP_DYNAMIC_INTERCEPTORS",
 * Example:
 * ```typescript
 * ...
 *
 * {
 *   imports: [
 *     YueUiHttpModule,
 *     {
 *        provide: YUE_UI_HTTP_DYNAMIC_INTERCEPTORS,
 *        useValue: [
 *          // Your interceptors stayed here
 *        ]
 *      },
 *   ]
 * }
 * ...
 * ```
 *
 * You can also add the option to cache the requests
 * that we will make to the API, we can do this using
 * the injection token "YUE_UI_ENABLE_CACHE_RESPONSE", for example:
 * ```typescript
 * ...
 *
 * {
 *   imports: [
 *     YueUiHttpModule,
 *     {
 *        provide: YUE_UI_ENABLE_CACHE_RESPONSE,
 *        useValue: true
 *      },
 *   ]
 * }
 * ...
 * ```
 * The injection teken "YUE_UI_ENABLE_CACHE_RESPONSE" accepts the following values:
 *   * type{YueEnableCache} Boolean - true or false
 *   * type{YueEnableCache} Object - { condition: 'with' | 'without', flag: string }
 *      * If the "condition" is "with" it will check the requests that have the "flag" and iŕa cache it.
 *      * If the "condition" is "without" it will check for requests that do not have the "flag" and will perform the same cache.
 *
 * Exemple:
 *
 * With the flag on requests
 * ```typescript
 * ...
 *
 * {
 *   imports: [
 *     YueUiHttpModule,
 *     {
 *        provide: YUE_UI_ENABLE_CACHE_RESPONSE,
 *        useValue: { condition: 'with', flag: 'cache' }
 *        // It will cache all requests with the "cache" flag
 *      },
 *   ]
 * }
 * ...
 * ```
 *
 * Without the flag on requests
 * ```typescript
 * ...
 *
 * {
 *   imports: [
 *     YueUiHttpModule,
 *     {
 *        provide: YUE_UI_ENABLE_CACHE_RESPONSE,
 *        useValue: { condition: 'without', flag: 'nocache' }
 *        // It will cache all requests without the "nocache" flag
 *      },
 *   ]
 * }
 * ...
 * ```
 *
 * @export
 * @class YueUiHttpModule
 */
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
