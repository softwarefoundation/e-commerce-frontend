import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable()
export class HttpInterceptorImpl implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('HTTP Interceptor: ', req.url);

    const token = localStorage.getItem('e-commerce-auth-token');

    if(token !== null && !req.url.includes('auth/authenticate')){
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }



    return next.handle(req).pipe(
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
