import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';




export class YueUiHttpInterceptorHandler implements HttpHandler {


  constructor(private readonly next: HttpHandler, private readonly interceptor: HttpInterceptor) { }

  public handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }

}
