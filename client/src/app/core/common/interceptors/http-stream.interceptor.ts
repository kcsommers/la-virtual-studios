import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpStreamInterceptor implements HttpInterceptor {
  intercept(
    _request: HttpRequest<any>,
    _next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercept:::: ');
    const _stream = _next.handle(_request);
    _stream.subscribe((_data) => {
      console.log('incomoing::::: ', _data);
    });
    return _stream;
  }
}
