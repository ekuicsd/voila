import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { JwtService } from './jwt.service';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private jwtService: JwtService,
      private router: Router,
       private userService: UserService,
       private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtService.getToken();
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          };
          console.log(token);
          if (token) {
            headersConfig['authorization'] = `${token}`;
          }

          const request = req.clone({ setHeaders: headersConfig });
          return next.handle(request).pipe(
            tap(
              (event: HttpEvent<any>) => { },
              (err: any) => {
                  if (err instanceof HttpErrorResponse) {
                      // if(err.status == 401) {
                      //   this.userService.purgeAuth();
                      //   this.router.navigateByUrl('/');
                      // }
                      console.log("error",err);
                    //   this.toastr.error();
                  }
              }
          )
          );
    }
}