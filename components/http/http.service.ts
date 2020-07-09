import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpHandler } from '@angular/common/http';

import { YUE_UI_HTTP_DYNAMIC_INTERCEPTORS } from './http.utils';

import { YueUiHttpCacheInterceptor } from './http-cache.interceptor';
import { YueUiHttpProgressInterceptor } from './http-progress.interceptor';

import { YueUiHttpInterceptorHandler } from './http-interceptor.handler';




@Injectable()
export class YueUiHttpService extends HttpClient {

  constructor(private httpHandler: HttpHandler, private injector: Injector, @Optional() @Inject(YUE_UI_HTTP_DYNAMIC_INTERCEPTORS) private interceptors: HttpInterceptor[] = []) {
    super(httpHandler);

    if (!this.interceptors) {
      this.interceptors = [
        this.injector.get(YueUiHttpCacheInterceptor),
        this.injector.get(YueUiHttpProgressInterceptor)
      ];
    } else {
      let httpCache = false;
      for (let i = 0, l = this.interceptors.length; i < l; i++) {
        if ('object' !== typeof this.interceptors[i]) {
          this.interceptors[i] = this.injector.get(this.interceptors[i]);
        }
        if (this.interceptors[i] instanceof YueUiHttpCacheInterceptor) {
          httpCache = true;
        }
      }
      if (!httpCache) {
        this.interceptors.push(this.injector.get(YueUiHttpCacheInterceptor));
      }
      let httpProgress = false;
      for (let i = 0, l = this.interceptors.length; i < l; i++) {
        if ('object' !== typeof this.interceptors[i]) {
          this.interceptors[i] = this.injector.get(this.interceptors[i]);
        }
        if (this.interceptors[i] instanceof YueUiHttpProgressInterceptor) {
          httpProgress = true;
        }
      }
      if (!httpProgress) {
        this.interceptors.push(this.injector.get(YueUiHttpProgressInterceptor));
      }
    }
  }

  public cache(forceUpdate?: boolean): HttpClient {
    const httpCacheInterceptor = this.injector.get(YueUiHttpCacheInterceptor).configure({ update: forceUpdate });
    return this.addInterceptor(httpCacheInterceptor);
  }

  public request(method?: any, url?: any, options?: any): any {
    const handler = this.interceptors.reduceRight(
      (next, interceptor) => new YueUiHttpInterceptorHandler(next, interceptor),
      this.httpHandler
    );
    return new HttpClient(handler).request(method, url, options);
  }

  public removeInterceptor(interceptorType: (...args: any[]) => any): YueUiHttpService {
    return new YueUiHttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter(i => !(i instanceof interceptorType))
    );
  }

  public addInterceptor(interceptor: HttpInterceptor): YueUiHttpService {
    return new YueUiHttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.concat([interceptor])
    );
  }

}
