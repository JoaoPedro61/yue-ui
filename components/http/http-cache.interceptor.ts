import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

import { YueUiHttpCacheService } from './http-cache.service';




@Injectable()
export class YueUiHttpCacheInterceptor implements HttpInterceptor {

  private forceUpdate = false;

  constructor(private readonly httpCacheService: YueUiHttpCacheService) { }

  public configure(options?: { update?: boolean } | null): YueUiHttpCacheInterceptor {
    const instance = new YueUiHttpCacheInterceptor(this.httpCacheService);
    if (options && options.update) {
      instance.forceUpdate = true;
    }
    return instance;
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    return new Observable((subscriber: Subscriber<HttpEvent<any>>) => {
      const cachedData = this.forceUpdate ? null : this.httpCacheService.getCacheData(request.urlWithParams);
      if (cachedData !== null) {
        subscriber.next(new HttpResponse(cachedData as Partial<any>));
        subscriber.complete();
      } else {
        next.handle(request)
          .subscribe(
            event => {
              if (event instanceof HttpResponse) {
                this.httpCacheService.setCacheData(request, request.urlWithParams, event);
              }
              subscriber.next(event);
            },
            error => subscriber.error(error),
            () => subscriber.complete()
          );
      }
    });
  }

}
