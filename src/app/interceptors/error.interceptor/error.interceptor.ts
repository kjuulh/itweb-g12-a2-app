import { AuthenticationService } from '../../services/authentication.service/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.authenticationService.logout();
          location.reload();
        }

        const error = err.message || err.statusText;
        return throwError(error);
      }),
    );
  }
  constructor(private authenticationService: AuthenticationService) {}
}
