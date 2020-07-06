import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';



/**
 * Add handler intercept in a specific request
 *
 * @export
 * @class YueUiHttpInterceptorHandler
 * @implements {HttpHandler}
 */
export class YueUiHttpInterceptorHandler implements HttpHandler {

  /**
   * Creates an instance of YueUiHttpInterceptorHandler.
   *
   * @param {HttpHandler} next
   * @param {HttpInterceptor} interceptor
   * @memberof YueUiHttpInterceptorHandler
   */
  constructor(private readonly next: HttpHandler, private readonly interceptor: HttpInterceptor) { }

  /**
   * Execute an handler
   *
   * @param {HttpRequest<any>} request
   * @returns {Observable<HttpEvent<any>>}
   * @memberof YueUiHttpInterceptorHandler
   */
  public handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }

}
