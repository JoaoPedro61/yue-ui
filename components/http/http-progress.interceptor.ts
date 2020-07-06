import { Injectable, Inject } from '@angular/core';
import { HttpResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { YUE_UI_PROGRESS_REQUESTS } from './http.utils';
import { YueProgressRequest } from './http.interfaces';



/**
 * Interceptor progress request
 *
 * @export
 * @class YueUiHttpProgressInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class YueUiHttpProgressInterceptor implements HttpInterceptor {

  /**
   * @ignore
   *
   * @private
   * @type {HttpRequest<any>[]}
   * @memberof YueUiHttpProgressInterceptor
   */
  private requests: HttpRequest<any>[] = [];

  /**
   * Creates an instance of YueUiHttpProgressInterceptor.
   *
   * @param {LoaderProgressToken} loader Loader token behavior
   * @memberof YueUiHttpProgressInterceptor
   */
  constructor(@Inject(YUE_UI_PROGRESS_REQUESTS) private readonly loader: YueProgressRequest) { }

  /**
   * Remove a request from request
   *
   * @param {HttpRequest<any>} req
   * @memberof YueUiHttpProgressInterceptor
   */
  public removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loader.next(this.requests.length > 0 ? { type: 'indeterminate' } : null);
  }

  /**
   * Intercep a request ans apply the loader flow
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof YueUiHttpProgressInterceptor
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loader.next({ type: 'indeterminate' });
    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }

}
