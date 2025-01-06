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
    // Show loader before processing the request
    this.loaderService.show();

    return next.handle(req).pipe(
      tap((event) => {
        // Handle successful response
        if (event instanceof HttpResponse) {
          const responseBody = event.body;

          // Check if the response contains a success message
          if (responseBody?.success === true && responseBody?.message) {
            this.notificationService.showSuccess(responseBody.message);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle error response
        this.loaderService.hide();

        // Check if the error is an expected server error
        if (error.error?.success === false && error.error?.message) {
          this.notificationService.showError(error.error.message);
        } else {
          // Generic error handling for unexpected errors
          this.notificationService.showError('An unexpected error occurred.');
        }

        // Handle 401 Unauthorized or 403 Forbidden
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
        }

        return throwError(() => error);
      }),
      finalize(() => {
        // Hide loader after the request is complete
        this.loaderService.hide();
      })
    );
  }
}
