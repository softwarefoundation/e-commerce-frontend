import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable()
export class HttpInterceptorImpl implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('HTTP Interceptor: ', req.url);

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
