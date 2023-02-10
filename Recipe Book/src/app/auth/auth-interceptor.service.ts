import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
  ) { }

  // below is the interceptor that just adds a token to all outgoing requests
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // below chains the pipe with operators from RxJs to resolve the error of two different Observables
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        // only sends out the modifiedRequest with the added token to requests where the user object is not null
        if (!user) return next.handle(req);
        const modifiedRequest = req.clone({ params: new HttpParams().set('auth', user.token) });
        return next.handle(modifiedRequest);
      }),
    );
  }
}
