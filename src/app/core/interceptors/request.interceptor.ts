import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const baseUrl = environment.apiEndpoint;
    const newReq = req.clone({url: `${baseUrl}/${req.url}`});

    return next.handle(newReq)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
}
