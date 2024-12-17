import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {AuthToken} from "../../../shared/models/auth-token";

@Injectable()
export class HttpInterceptorImpl implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('e-commerce-auth-token');

    // @ts-ignore
    const authToken: AuthToken = JSON.parse(token);

    if (token !== null && !request.url.includes('auth/authenticate')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken.access_token}`
        }
      })
    }

    return next.handle(request).pipe(
      map((event) => {
          return event;
        }
      ),
      catchError((error) => {
        return throwError(error);
      })
    );

  }
}
