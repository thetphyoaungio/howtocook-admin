import { HTTP_INTERCEPTORS, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { 
    LocalStorageService, 
    CryptoService, 
} from "../utils";

@Injectable({providedIn:'root'})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private localService: LocalStorageService, 
        private cryptoService:CryptoService,
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localService.getToken() ? this.cryptoService.decrypt(this.localService.getToken()) : null;
        let authReq;

        if(token){
            authReq = req.clone({
                headers: new HttpHeaders({
                    'Accept':'application/json',
                    'Authorization': `Bearer ${token}`,
                })
            });
        }else{
            authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                })
            });
        }
        
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}
];