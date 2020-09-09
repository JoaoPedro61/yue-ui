import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YueUiHttpHeaders } from './http.interfaces';
import { YUE_UI_HTTP_HEADERS } from './http.utils';




@Injectable()
export class YueUiHttpHeaderInterceptor implements HttpInterceptor {

  constructor(@Inject(YUE_UI_HTTP_HEADERS) private readonly headers$: YueUiHttpHeaders) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = this.headers$.getValue();
    if (headers) {
      const newHeaders: HttpHeaders = new HttpHeaders(headers);
      const clone = request.clone({ headers: newHeaders });
      return next.handle( clone );
    } else {
      return next.handle(request);
    }
  }

}
