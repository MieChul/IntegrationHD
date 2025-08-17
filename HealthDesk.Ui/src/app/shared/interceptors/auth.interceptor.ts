import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const isGetRequest = req.method.toLowerCase() === 'get';

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const responseBody = event.body;
          const message = responseBody?.message;
          if (!isGetRequest && responseBody?.success === true && typeof message === 'string' && message.trim() !== '') {
            this.notificationService.showSuccess(message);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        const serverMessage = error.error?.message;
        const genericErrorMessage = 'Something went wrong, please try again later or contact admin';

        if (typeof serverMessage === 'string' && serverMessage.trim() !== '') {
          this.notificationService.showError(serverMessage);
        } else {
          this.notificationService.showError(genericErrorMessage);
        }

        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
        }

        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}