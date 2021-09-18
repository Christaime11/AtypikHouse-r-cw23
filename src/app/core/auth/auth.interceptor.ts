import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

import { TokenService } from './token.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

  // tslint:disable-next-line:typedef
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.tokenService.getToken();
        req = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + accessToken,
              Accept : 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
        });
        return next.handle(req);
    }
}
